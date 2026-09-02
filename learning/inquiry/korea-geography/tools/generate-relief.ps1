param(
  [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\assets")
)

$ErrorActionPreference = "Stop"

$source = @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class JoyclassReliefGenerator
{
    private struct Stop
    {
        public int Height;
        public Color Color;
        public Stop(int height, Color color) { Height = height; Color = color; }
    }

    private static readonly Stop[] Stops = new Stop[]
    {
        new Stop(0, Color.FromArgb(232, 236, 211)),
        new Stop(80, Color.FromArgb(214, 226, 187)),
        new Stop(220, Color.FromArgb(190, 211, 161)),
        new Stop(450, Color.FromArgb(171, 195, 143)),
        new Stop(750, Color.FromArgb(172, 174, 126)),
        new Stop(1100, Color.FromArgb(166, 151, 111)),
        new Stop(1600, Color.FromArgb(153, 129, 96)),
        new Stop(2300, Color.FromArgb(139, 112, 88)),
        new Stop(3200, Color.FromArgb(211, 205, 188)),
        new Stop(5000, Color.FromArgb(239, 239, 232))
    };

    private static int[] BuildHeightTable()
    {
        int[] table = new int[255];
        int cursor = 0;
        for (int i = 0; i < 11; i++) table[cursor++] = -11000 + i * 1000;
        table[cursor++] = -100; table[cursor++] = -50; table[cursor++] = -20;
        table[cursor++] = -10; table[cursor++] = -1;
        for (int i = 0; i < 150; i++) table[cursor++] = 20 * i;
        for (int i = 0; i < 60; i++) table[cursor++] = 3000 + 50 * i;
        for (int i = 0; i < 29; i++) table[cursor++] = 6000 + 100 * i;
        return table;
    }

    private static Color TerrainColor(int elevation)
    {
        if (elevation <= Stops[0].Height) return Stops[0].Color;
        for (int i = 1; i < Stops.Length; i++)
        {
            if (elevation <= Stops[i].Height)
            {
                Stop a = Stops[i - 1]; Stop b = Stops[i];
                double t = (double)(elevation - a.Height) / (b.Height - a.Height);
                return Color.FromArgb(
                    (int)Math.Round(a.Color.R + (b.Color.R - a.Color.R) * t),
                    (int)Math.Round(a.Color.G + (b.Color.G - a.Color.G) * t),
                    (int)Math.Round(a.Color.B + (b.Color.B - a.Color.B) * t));
            }
        }
        return Stops[Stops.Length - 1].Color;
    }

    public static void Generate(string cache, string outputPng, int z, int x0, int x1, int y0, int y1, int feather)
    {
        Directory.CreateDirectory(cache);

        int width = (x1 - x0 + 1) * 256;
        int height = (y1 - y0 + 1) * 256;
        int[] heights = BuildHeightTable();
        using (Bitmap output = new Bitmap(width, height, PixelFormat.Format32bppArgb))
        {
            Rectangle outputRect = new Rectangle(0, 0, width, height);
            BitmapData outputData = output.LockBits(outputRect, ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
            byte[] destination = new byte[Math.Abs(outputData.Stride) * height];

            for (int tileY = y0; tileY <= y1; tileY++)
            {
                for (int tileX = x0; tileX <= x1; tileX++)
                {
                    string path = Path.Combine(cache, tileX + "_" + tileY + ".png");
                    using (Bitmap raw = (Bitmap)Image.FromFile(path))
                    using (Bitmap tile = new Bitmap(256, 256, PixelFormat.Format32bppArgb))
                    {
                        using (Graphics g = Graphics.FromImage(tile)) g.DrawImageUnscaled(raw, 0, 0);
                        Rectangle tileRect = new Rectangle(0, 0, 256, 256);
                        BitmapData tileData = tile.LockBits(tileRect, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                        byte[] source = new byte[Math.Abs(tileData.Stride) * 256];
                        Marshal.Copy(tileData.Scan0, source, 0, source.Length);
                        tile.UnlockBits(tileData);

                        int offsetX = (tileX - x0) * 256;
                        int offsetY = (tileY - y0) * 256;
                        for (int py = 0; py < 256; py++)
                        {
                            int sourceRow = py * tileData.Stride;
                            int destinationRow = (offsetY + py) * outputData.Stride + offsetX * 4;
                            for (int px = 0; px < 256; px++)
                            {
                                int sourceIndex = sourceRow + px * 4;
                                byte b = source[sourceIndex];
                                byte g = source[sourceIndex + 1];
                                byte r = source[sourceIndex + 2];
                                byte a = source[sourceIndex + 3];
                                int tableIndex = Math.Max(0, Math.Min(heights.Length - 1, 255 - a));
                                int elevation = heights[tableIndex];
                                int destinationIndex = destinationRow + px * 4;

                                if (elevation < 0)
                                {
                                    destination[destinationIndex + 3] = 0;
                                    continue;
                                }

                                double nx = r / 127.5 - 1.0;
                                double ny = g / 127.5 - 1.0;
                                double nz = b / 127.5 - 1.0;
                                double dot = nx * -0.48 + ny * -0.52 + nz * 0.71;
                                double shade = Math.Max(0.58, Math.Min(1.12, 0.73 + 0.43 * dot));
                                Color color = TerrainColor(elevation);
                                destination[destinationIndex] = (byte)Math.Max(0, Math.Min(255, Math.Round(color.B * shade)));
                                destination[destinationIndex + 1] = (byte)Math.Max(0, Math.Min(255, Math.Round(color.G * shade)));
                                destination[destinationIndex + 2] = (byte)Math.Max(0, Math.Min(255, Math.Round(color.R * shade)));

                                double fade = 1.0;
                                if (feather > 0)
                                {
                                    int gx = offsetX + px;
                                    int gy = offsetY + py;
                                    int edge = Math.Min(Math.Min(gx, width - 1 - gx), Math.Min(gy, height - 1 - gy));
                                    double t = Math.Max(0.0, Math.Min(1.0, edge / (double)feather));
                                    fade = t * t * (3.0 - 2.0 * t);
                                }
                                destination[destinationIndex + 3] = (byte)Math.Round(218 * fade);
                            }
                        }
                    }
                }
            }

            Marshal.Copy(destination, 0, outputData.Scan0, destination.Length);
            output.UnlockBits(outputData);
            output.Save(outputPng, ImageFormat.Png);
        }
    }
}
'@

Add-Type -AssemblyName System.Drawing.Common
$drawingReferences = @(
  [System.Drawing.Bitmap].Assembly.Location,
  [System.Drawing.Color].Assembly.Location,
  (Join-Path $PSHOME 'System.Private.Windows.GdiPlus.dll'),
  (Join-Path $PSHOME 'System.Private.Windows.Core.dll')
) | Select-Object -Unique
Add-Type -TypeDefinition $source -ReferencedAssemblies $drawingReferences -IgnoreWarnings

$temp = Join-Path $env:TEMP "joyclass-relief-build"
New-Item -ItemType Directory -Force -Path $temp | Out-Null
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

function Get-NormalTiles {
  param([string]$Cache, [int]$Zoom, [int]$X0, [int]$X1, [int]$Y0, [int]$Y1)

  New-Item -ItemType Directory -Force -Path $Cache | Out-Null
  $requests = for ($y = $Y0; $y -le $Y1; $y++) {
    for ($x = $X0; $x -le $X1; $x++) {
      [pscustomobject]@{ X = $x; Y = $y }
    }
  }

  $requests | ForEach-Object -Parallel {
    $target = Join-Path $using:Cache ("{0}_{1}.png" -f $_.X, $_.Y)
    if ((Test-Path -LiteralPath $target) -and (Get-Item -LiteralPath $target).Length -gt 1000) { return }
    $tempTarget = $target + ".download"
    $uri = "https://s3.amazonaws.com/elevation-tiles-prod/normal/$using:Zoom/$($_.X)/$($_.Y).png"
    Invoke-WebRequest -Uri $uri -OutFile $tempTarget -UseBasicParsing
    Move-Item -LiteralPath $tempTarget -Destination $target -Force
  } -ThrottleLimit 10
}
$regionalPng = Join-Path $temp "east-asia-physical-relief.png"
$detailPng = Join-Path $temp "korea-physical-relief.png"
$regionalCache = Join-Path $env:TEMP "joyclass-east-asia-normal-z7"
$detailCache = Join-Path $env:TEMP "joyclass-korea-normal-z9"

Get-NormalTiles $regionalCache 7 96 124 37 60
Get-NormalTiles $detailCache 9 432 442 187 206

[JoyclassReliefGenerator]::Generate($regionalCache, $regionalPng, 7, 96, 124, 37, 60, 0)
[JoyclassReliefGenerator]::Generate($detailCache, $detailPng, 9, 432, 442, 187, 206, 280)

& ffmpeg -y -hide_banner -loglevel error -i $regionalPng -vf "scale=4096:-2:flags=lanczos" -c:v libwebp -quality 76 -compression_level 6 -pix_fmt yuva420p (Join-Path $OutputDirectory "east-asia-physical-relief.webp")
if ($LASTEXITCODE -ne 0) { throw "Regional relief WebP encoding failed." }

& ffmpeg -y -hide_banner -loglevel error -i $detailPng -vf "scale=2048:-2:flags=lanczos" -c:v libwebp -quality 78 -compression_level 6 -pix_fmt yuva420p (Join-Path $OutputDirectory "korea-physical-relief.webp")
if ($LASTEXITCODE -ne 0) { throw "Korea relief WebP encoding failed." }

Get-Item (Join-Path $OutputDirectory "east-asia-physical-relief.webp"), (Join-Path $OutputDirectory "korea-physical-relief.webp") | Select-Object FullName, Length
