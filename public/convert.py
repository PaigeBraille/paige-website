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

    # Fill transparent parts with white
    for i, frame in enumerate(frames):
        if frame.mode == "RGBA":
            white_background = Image.new("RGBA", frame.size, "WHITE")
            frames[i] = Image.alpha_composite(white_background, frame).convert("RGB")

    # Optimize and save the GIF with disposal method set to 1
    frames[0].save(output_file, format="GIF", save_all=True, append_images=frames[1:], loop=0, duration=int(1000/fps), disposal=1, optimize=True)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python convert.py input.mp4 output.gif")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    # You can customize the following parameters as needed
    start_time = 0  # Start time in seconds
    duration = None  # Duration in seconds, set to None to use the whole video
    fps = 15  # Frames per second
    resize_scale = 1  # Resize scale, set to 1 for no resizing

    convert_mp4_to_gif(input_file, output_file, start_time, duration, fps, resize_scale)
