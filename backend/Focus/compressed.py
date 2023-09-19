import pydub
import tempfile
import os
from django.core.files.base import ContentFile
from PIL import Image
import io


def compress_audio(audio):
    temp_file = None  # Initialiser temp_file en dehors de la clause try

    try:
        # Charger le fichier audio
        audio_file = pydub.AudioSegment.from_file(audio)

        # Définir le débit binaire cible (par exemple, 64 kbps)
        target_bitrate = "64k"

        # Appliquer la compression
        compressed_audio = audio_file.export(
            format="mp3",
            bitrate=target_bitrate
        )

        # Créer un fichier temporaire
        with tempfile.NamedTemporaryFile(
            suffix=".mp3",
            delete=False
        ) as temp_file:
            # compressées dans le fichier temporaire
            temp_file.write(compressed_audio.read())

        # Retourner le chemin absolu du fichier compressé
        return temp_file.name

    finally:
        # Fermer et supprimer le fichier temporaire même en cas d'exception
        if temp_file and not temp_file.closed:
            temp_file.close()
            os.remove(temp_file.name)


# compresse image
def compres_image(image_path):
    # Ouvrir l'image
    image = Image.open(image_path)
    # Convertir l'image en mode RVB
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
