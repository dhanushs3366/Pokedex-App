import os
import glob
import cairosvg

def convert_svg_to_png(svg_file, output_dir="./", scale=3):
    # Generate the output PNG filename
    png_file = os.path.splitext(os.path.basename(svg_file))[0] + '.png'
    png_path = os.path.join(output_dir, png_file)

    # Convert SVG to PNG with higher quality
    cairosvg.svg2png(url=svg_file, write_to=png_path, scale=scale, dpi=400)

    print(f'Converted {svg_file} to {png_path}')

def main(directory):
    # Get all SVG files in the specified directory
    svg_files = glob.glob(os.path.join(directory, '*.svg'))

    # Create a directory for output if it doesn't exist
    output_dir = os.path.join(directory, 'png_output')
    os.makedirs(output_dir, exist_ok=True)

    # Convert each SVG file to PNG
    for svg_file in svg_files:
        convert_svg_to_png(svg_file, output_dir=output_dir)

if __name__ == '__main__':
    directory = './'  # Specify your directory here
    main(directory)
