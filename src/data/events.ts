import { EventDTO } from "@/app/events/_dtos/event.dto";

export const events: EventDTO[] = [
  {
    id: 1,
    title: "FORNAS VIII 2025",
    slug: "fornas-viii-2025",
    excerpt:
      "Ayo Olahraga, Bugarkan Indonesia, dan Bangkitkan Sport Tourism menuju Indonesia Emas 2045",
    body: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod elit quis risus convallis, sed consequat quam aliquet. In hac habitasse platea dictumst. Curabitur pellentesque, arcu id tempus cursus, massa nunc pharetra sapien, eget posuere felis libero at mi. Donec dolor elit, lacinia id feugiat ut, commodo sed ipsum. Nam suscipit dapibus sem sed ornare. Integer consequat libero ut mauris auctor ultrices. Nullam egestas leo turpis. In hac habitasse platea dictumst.</p>

  <p>Praesent non odio vitae ipsum porttitor ornare sit amet ac nibh. Vestibulum consectetur molestie eros. Ut congue, odio eu semper condimentum, ipsum dui lobortis massa, id aliquam lorem urna a ligula. Nullam suscipit felis dolor, ut finibus nisl dapibus eu. Maecenas a iaculis metus, ut mollis arcu. Ut finibus placerat diam eu scelerisque. Sed blandit quam sit amet mauris malesuada, non rutrum ligula porttitor. Duis non nulla id mi dapibus condimentum. Donec porta finibus volutpat. Pellentesque suscipit tellus at ante faucibus, non lobortis neque vehicula. In in urna tincidunt, sagittis metus eget, sodales justo. Ut ornare, tellus vitae porttitor gravida, justo enim congue eros, a suscipit justo magna vel metus. Ut sit amet eleifend velit. Maecenas lacinia vulputate neque in malesuada.</p>

  <p>Sed sit amet ipsum fermentum, porttitor orci ac, ullamcorper neque. Nulla tincidunt aliquet mollis. Proin sollicitudin ipsum vitae felis molestie malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi convallis urna sit amet congue efficitur. Pellentesque maximus elit non enim aliquet interdum. Aliquam et sapien at nisi imperdiet pulvinar non a mauris. Proin fringilla, justo a rhoncus ultrices, libero diam congue justo, et molestie lorem nisl sit amet diam. Vivamus venenatis tellus vel faucibus pharetra.</p>

  <p>Nunc eget massa quis orci mollis imperdiet non et ligula. Suspendisse molestie posuere dictum. Proin dolor nunc, feugiat pellentesque pulvinar sit amet, feugiat vel augue. Phasellus imperdiet lorem eu mauris pretium finibus. Curabitur ante mauris, facilisis quis massa a, molestie pulvinar nunc. Nunc luctus erat ut lectus auctor, at posuere lectus pharetra. Donec mauris purus, fermentum et congue eget, ornare eget erat. Nullam vitae mauris lacinia, accumsan est a, cursus nulla. Aenean maximus malesuada turpis quis sagittis. Nulla eu mattis lorem, nec condimentum sem. Fusce ut fermentum turpis.</p>

  <p>Suspendisse euismod, dui a faucibus efficitur, mi velit ornare lorem, at mollis nunc neque non nibh. Vestibulum blandit vitae turpis ut vulputate. Curabitur aliquam elit at urna convallis, a tincidunt lectus ullamcorper. Aenean sed dignissim lorem. Vestibulum mattis dapibus eros id luctus. Suspendisse ullamcorper quam lectus, a feugiat est commodo eu. Quisque tempor eu mi at tristique. Quisque eget lacus urna. Aenean sem massa, maximus tincidunt dictum eget, dapibus vitae nisi.</p>`,
    author: "Yayasan Jantung Indonesia",
    image_url: "/images/banner/banner-5.jpg",
    bg_cover: "",
    category: "nasional",
    created_at: new Date(Date.now()),
    events_date: new Date("2025-07-25"),
  },
  {
    id: 2,
    title: "Acara 2",
    slug: "acara-2",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    body: `
      <h3 class="text-primary fw-bold lato-bold mb-3">Jangan Lupakan Peradangan Kronis sebagai Penyebab Penyakit Jantung</h3>
      <p class="MsoNormal" style="text-align:justify">Ketika kita membahas penyakit
jantung, mungkin pikiran langsung melayang ke kolesterol tinggi, kebiasaan
merokok, atau tekanan darah yang tak terkontrol. Namun, tahukah Anda bahwa ada
satu elemen "samar" yang sering terabaikan, padahal diam-diam bekerja merusak
sistem kardiovaskular kita? Yup, itulah peradangan kronis --musuh dalam selimut
yang bisa mengacaukan jantung dan pembuluh darah secara perlahan tapi pasti.
Bayangkan seperti api kecil di pojokan, dibiarkan menyala, lama-lama bisa
membakar seluruh rumah!</p>
    `,
    author: "Pihak Lain",
    image_url: "/images/banner/banner-1.jpg",
    bg_cover: "",
    category: "capacity building",
    created_at: new Date(Date.now()),
    events_date: new Date("2024-07-25"),
  },
  {
    id: 3,
    title: "JAMNAS YJI 2023",
    slug: "jamnas-yji-2023",
    excerpt:
      "Nulla rhoncus ex sed diam eleifend, quis scelerisque tortor rhoncus. Curabitur in leo at velit scelerisque fringilla. Donec feugiat urna leo, quis dictum quam vulputate id. Phasellus a imperdiet purus. Nunc aliquam blandit mi nec auctor. Maecenas facilisis posuere elit, vel rhoncus dui efficitur sit amet. Etiam dolor est, dignissim quis tincidunt sed, luctus ultricies libero. Vivamus fermentum mauris et nulla tristique, vel efficitur quam fringilla.",
    body: "",
    author: "Yayasan Jantung Indonesia",
    image_url: "/images/banner/banner-6.jpg",
    bg_cover: "",
    category: "capacity building",
    created_at: new Date(Date.now()),
    events_date: new Date("2023-07-25"),
  },
  {
    id: 4,
    title: "Acara Lokal",
    slug: "acara-lokal",
    excerpt:
      "Mauris interdum eros sit amet posuere pharetra. Donec lobortis mattis leo faucibus elementum. Nam consequat libero non ante luctus, nec gravida sem sagittis. Donec non nibh ac ipsum accumsan hendrerit a vel quam. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent felis sem, sodales vitae tempor rutrum, sagittis eget lectus. Donec posuere justo eu diam viverra, pulvinar vehicula dui scelerisque. Morbi sit amet iaculis mauris. Duis sed ipsum sed ligula vestibulum convallis. Phasellus a turpis purus. Aliquam maximus nunc quam, non mattis eros suscipit id. Vivamus dolor risus, eleifend nec pharetra non, hendrerit nec mi.",
    body: "",
    author: "Achmad Hendarsyah",
    image_url: "/images/banner/banner-20.jpg",
    bg_cover: "",
    category: "gaya hidup",
    created_at: new Date(Date.now()),
    events_date: new Date("2022-07-25"),
  },
  {
    id: 5,
    title: "Acara 5",
    slug: "acara-5",
    excerpt:
      "Sed eleifend blandit nisl at semper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam ac nisl nisi. Nullam pharetra enim id placerat gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer vitae tellus semper, aliquet tortor et, pretium lectus. Fusce tempus mattis ex eget suscipit. Quisque posuere odio non volutpat imperdiet. Praesent id orci efficitur, dignissim turpis nec, placerat leo.",
    body: "",
    author: "Yayasan Jantung Indonesia",
    image_url: "/images/banner/banner-19.jpg",
    bg_cover: "",
    category: "seminar",
    created_at: new Date(Date.now()),
    events_date: new Date("2021-07-25"),
  },
];
