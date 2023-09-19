"""Module providingFunction printing python version."""
import io
from PIL import Image
from moviepy.editor import VideoFileClip
from django.core.files.base import ContentFile


# compresse image
def compres_image(image_path):
    """this function is can compres image"""
    # Ouvrir l'image
    image = Image.open(image_path)

    # Convertir l'image en mode RVB
    if image.mode != "RGB":
        image = image.convert("RGB")
    # Créer un tampon de mémoire pour stocker l'image compressée
    output_buffer = io.BytesIO()

    # on va reduire image a 80%
    max_width = 1000
    width, height = image.size
    if width > max_width:
        ratio = max_width / width
        new_height = int(height * ratio)
        image = image.resize((max_width, new_height))

    # Compresser l'image en JPEG avec un facteur de qualité de 80
    image.save(output_buffer, format="JPEG", quality=80)

    # Obtenir les octets compressés de l'image
    compressed_data = output_buffer.getvalue()
    # Créer un objet ContentFile à partir des données compressées
    compressed_file = ContentFile(compressed_data, name="new.jpg")

    # Retourner le fichier compressé
    return compressed_file


# compresse et couper video
def compress_and_cut_video(input_file, output_file):
    # Get the path of the uploaded file
    file_path = input_file.temporary_file_path()
    # Ouvrir la vidéo d'entrée
    clip = VideoFileClip(file_path)
    # cut video in 1
    clip = clip.subclip(0, 60)
    # cup vide
    compressed_clip = clip.write_videofile(output_file, fps=25)
    # Delete the original file
    return compressed_clip
