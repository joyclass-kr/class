# 1986 Geumseong 2D Cel Animation LoRA Training Kit

## 1. Dataset Status
- Total images: 121 authentic scans with text removed
- Folder: tools/geumseong-lora-kit/dataset/10_geumseong_style/
- Archive: tools/geumseong-lora-kit/geumseong_dataset.zip (78MB)
- Trigger word: geumseong_style

## 2. Recommended Training Parameters
- Network Dim (Rank): 32
- Network Alpha: 16
- Learning Rate: UNet 1e-4, Text Encoder 5e-5
- Optimizer: AdamW8bit
- Epochs: 10 (Repeats: 10)
- Target Resolution: 768x768 / 1024x1024

## 3. Inference Usage
- Prompt: <lora:geumseong_1986:0.8>, geumseong_style, ...
- Negative: modern 3D rendering, realistic anatomy, sharp V-jaw, symmetrical glass eyes, digital gradient