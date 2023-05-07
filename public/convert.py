import sys
from moviepy.editor import *
from PIL import Image, ImageSequence


def convert_mp4_to_gif(input_file, output_file, start_time=0, duration=None, fps=15, resize_scale=1):
    # Load the video clip
    clip = VideoFileClip(input_file)

    # Set start time and duration for the clip
    if duration:
        clip = clip.subclip(start_time, start_time + duration)
    else:
        clip = clip.subclip(start_time)

    # Resize the clip if needed
    if resize_scale != 1:
        clip = clip.resize(resize_scale)

    # Save frames as images
    frames = [Image.fromarray(frame) for frame in clip.iter_frames(fps=fps)]

    # Optimize and save the GIF
    frames[0].save(output_file, format="GIF", save_all=True, append_images=frames[1:], loop=0, duration=int(1000/fps), disposal=2, optimize=True)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python convert_mp4_to_gif.py input.mp4 output.gif")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    # You can customize the following parameters as needed
    start_time = 0  # Start time in seconds
    duration = None  # Duration in seconds, set to None to use the whole video
    fps = 30  # Frames per second
    resize_scale = 1  # Resize scale, set to 1 for no resizing

    convert_mp4_to_gif(input_file, output_file, start_time, duration, fps, resize_scale)
