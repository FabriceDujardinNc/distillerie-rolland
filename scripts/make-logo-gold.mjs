// Génère les logos en version « or sur fond transparent » à partir des JPEG
// noir sur blanc fournis par le client (les lignes noires → canal alpha).
import sharp from 'sharp';

const root = '/home/gladius/dev/distillerie-rolland';
const logos = [
  ['logo-distillerie-rolland-monogramme.jpg', 'logo-distillerie-rolland-monogramme-or.png'],
  ['logo-la-metisse-rhum-traditionnel.jpg', 'logo-la-metisse-rhum-traditionnel-or.png'],
];

for (const [src, out] of logos) {
  const input = `${root}/src/assets/images/${src}`;
  const { width, height } = await sharp(input).metadata();

  // Lignes du dessin (sombres) → blanches sur noir = masque alpha
  const alpha = await sharp(input).greyscale().negate().toBuffer();

  // Aplat or aux dimensions du logo + alpha
  await sharp({ create: { width, height, channels: 3, background: '#d9b36a' } })
    .joinChannel(alpha)
    .png()
    .toFile(`${root}/src/assets/images/${out}`);

  console.log('OK →', out);
}
