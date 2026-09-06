import os

base = r'e:\webprojects\class\learning\literacy-numeracy\story-books'
print('=== STORYBOOK IMAGE AUDIT ===')
for root, dirs, files in os.walk(base):
    if os.path.basename(root) == 'images':
        book_rel = os.path.relpath(os.path.dirname(root), base)
        pngs = [x for x in files if x.endswith('.png')]
        webps = [x for x in files if x.endswith('.webp')]
        jpgs = [x for x in files if x.endswith('.jpg')]
        print(f'{book_rel:40s} | Total: {len(files):2d} | PNG: {len(pngs):2d} | WEBP: {len(webps):2d} | JPG: {len(jpgs):2d}')
