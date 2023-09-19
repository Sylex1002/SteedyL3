import os
from PIL import Image
from moviepy.editor import VideoFileClip
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage


def compress_media(file):
    # obtenir le nom de fichier du fichier téléchargé

    # obtenir l'extension de fichier à partir du nom de fichier
    extension = os.path.splitext(file)[1]
    # Si le fichier est une image
    if extension.lower() in ['.jpg', '.jpeg', '.png','.gif']:
        # Ouvrir l'image avec PIL
        with Image.open(file) as img:
            # Définir la qualité de compression
            quality = 60

            # Compresser l'image
            img.save(file, optimize=True, quality=quality)
            # Enregistrer l'image compressée sur le disque dur
            file_path = default_storage.save(f"publications/Image/compressed_{file.name}", ContentFile(file.read()))

            with open(file_path, 'wb') as f:
                f.write(file.read())
                return file_path

    # Si le fichier est une vidéo
    elif extension.lower() in ['.mp4', '.avi', '.mov', '.wmv', '.flv']:
        # Charger la vidéo avec moviepy
        video = VideoFileClip(file)

        # Définir les paramètres de compression
        target_bitrate = "500k"  # Définir le débit binaire cible en kilobits/s
        format_extension = "mp4"  # Définir le format de sortie

        # Compresser la vidéo
        compressed_video = video.resize(height=480).speedx(2.0).write_videofile(
            None,
            preset='medium',
            bitrate=target_bitrate,
            audio=True,
            threads=4,
            temp_audiofile=f"temp-audio-{file.name}",
            remove_temp=True,
            codec=format_extension,
        )

        # Enregistrer la vidéo compressée sur le disque dur
        file_path = default_storage.save(f"publicationsVideo/compressed_{file}", ContentFile(compressed_video.read()))

        with open(file_path, 'wb') as f:
            f.write(compressed_video.read())
            return file_path

    # Si le fichier n'est ni une image ni une vidéo, renvoyer une erreur
    else:
        raise ValueError("The file was Image or Video do not other")
