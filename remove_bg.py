import os
import subprocess

image_dir = 'public/images'
files = [
    'ashok.jpeg', 'chaitanya.jpg', 'ketan.jpeg', 'mahesh.jpeg',
    'minar.jpeg', 'monika.jpeg', 'moris.jpeg', 'nester.jpeg',
    'nikhil.jpeg', 'sakshi.jpeg', 'sanjali.JPEG', 'santosh.jpeg',
    'soham.jpeg', 'siddarth.png', 'lenny.png'
]

for file in files:
    input_path = os.path.join(image_dir, file)
    base, _ = os.path.splitext(file)
    output_path = os.path.join(image_dir, f"{base}_nobg.png")
    
    if os.path.exists(input_path):
        print(f"Processing {file}...")
        subprocess.run(['rembg', 'i', input_path, output_path])
    else:
        print(f"Skipping {file}, not found.")
