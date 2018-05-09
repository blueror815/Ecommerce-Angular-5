

import {Product} from '../interfaces/product';

const basePath = '/';

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Certified Pre-Owned Leica M (Typ 240) Edition "Leica 60" (205/600)',
    price: 10995,
    imageUrls: [
      basePath + 'assets/img/products/1-1.jpg',
      basePath + 'assets/img/products/1-2.jpg',
      basePath + 'assets/img/products/1-3.jpg',
      basePath + 'assets/img/products/1-4.jpg',
      basePath + 'assets/img/products/1-5.jpg',
    ],
    description: '',
    categoryId: 201899,
  },
  {
    id: '2',
    title: 'Certified Pre-Owned Leica M Monochrom (Typ 246) - Black Chrome',
    price: 6595,
    imageUrls: [
      basePath + 'assets/img/products/2-1.jpg',
      basePath + 'assets/img/products/2-2.jpg',
      basePath + 'assets/img/products/2-3.jpg',
      basePath + 'assets/img/products/2-4.jpg',
    ],
    description: `
      The Leica M Monochrom (Typ 246) is the first and only digital camera that 
      captures a real black and white image, still or moving.  Reduced to the 
      essentials for true, authentic and direct black and white photography, 
      the Leica M Monochrom offers unparalleled image performance, outstanding 
      low light capabilities and rich details.

      Black and white photography is the essence of photography. Leica produced 
      the first first digital monochrome camera in the 35 mm format and the new 
      Leica M Monochrom is a step into the next generation.
    `,
    categoryId: 201899,
  },
  {
    id: '3',
    title: 'Certified Pre-Owned Leica S (Typ 006)',
    price: 6595,
    imageUrls: [basePath + 'assets/img/products/3.jpg'],
    description: `
      The outstanding imaging quality of the Leica S is not attributable to any 
      single system component. Every single component is optimized to perfection, 
      but its true powers are shown by their interaction. Decisive proof of this 
      can be seen in the 37.5 megapixel CCD image sensor, specially developed 
      for Leica, with micro lens shift and an infrared filter, which - together 
      with the extremely high performance of the Maestro processor - ensures that 
      creative ideas always lead to outstanding images.
    `,
    categoryId: 201899,
  },
  {
    id: '4',
    title: 'Certified Pre-Owned Leica SL (Typ 601), Black',
    price: 6395,
    imageUrls: [basePath + 'assets/img/products/4.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '5',
    title: 'Leica M (Typ 240) à la carte Program',
    price: 6380,
    imageUrls: [basePath + 'assets/img/products/5.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '6',
    title: 'Leica M (Typ 240) A La Carte, Black Body/Red Leather',
    price: 7020,
    imageUrls: [basePath + 'assets/img/products/6.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '7',
    title: 'Leica M (Typ 240) Edition "Leica 60"',
    price: 18500,
    imageUrls: [basePath + 'assets/img/products/7.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '8',
    title: 'Leica M - Black Paint (Typ 240)',
    price: 6595,
    imageUrls: [basePath + 'assets/img/products/8.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '9',
    title: 'Leica M - Silver Chrome (Typ 240)',
    price: 7250,
    imageUrls: [basePath + 'assets/img/products/9.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '10',
    title: 'Leica M Monochrom',
    price: 7950,
    imageUrls: [basePath + 'assets/img/products/10.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '11',
    title: 'Leica M Monochrom (Typ 246) - Black Chrome',
    price: 7450,
    imageUrls: [basePath + 'assets/img/products/11.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '12',
    title: 'Leica M Monochrom Silver Chrome',
    price: 7950,
    imageUrls: [basePath + 'assets/img/products/12.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '13',
    title: 'Leica M Set Edition "Leica 100" - Null Series 24/25',
    price: 74500,
    imageUrls: [basePath + 'assets/img/products/13.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '14',
    title: 'Leica M-P (Typ 240) Titanium Set',
    price: 22900,
    imageUrls: [basePath + 'assets/img/products/14.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '15',
    title: 'Leica M-P (Typ 240), Black Paint Finish',
    price: 6995,
    imageUrls: [basePath + 'assets/img/products/15.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '16',
    title: 'Leica M-P (Typ 240), Silver Chrome Finish',
    price: 6995,
    imageUrls: [basePath + 'assets/img/products/16.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '17',
    title: 'Leica M9-P White Edition Set - 23/50',
    price: 32995,
    imageUrls: [basePath + 'assets/img/products/17.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '18',
    title: 'Leica S (Typ 006)',
    price: 18500,
    imageUrls: [basePath + 'assets/img/products/18.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '19',
    title: 'Leica S (Typ 006) / 70mm Lens Set',
    price: 15995,
    imageUrls: [basePath + 'assets/img/products/19.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '20',
    title: 'Leica S (Typ 007)',
    price: 16900,
    imageUrls: [basePath + 'assets/img/products/20.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '21',
    title: 'Leica S Edition 100 Set',
    price: 34500,
    imageUrls: [basePath + 'assets/img/products/21.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '22',
    title: 'Leica S Summicron 100 Edition',
    price: 30900,
    imageUrls: [basePath + 'assets/img/products/22.jpg'],
    description: '',
    categoryId: 201899,
  },
  {
    id: '23',
    title: 'Leica S-E (Typ 006)',
    price: 16900,
    imageUrls: [basePath + 'assets/img/products/23.jpg'],
    description: '',
    categoryId: 201899,
  },
  /*{
    id: '24',
    title: 'Leica S-E (Typ 006) / 70mm Lens Set',
    price: 12995,
    imageUrls: [basePath + 'assets/img/products/24.jpg'],
    description: '',
    categoryId: 201899,
  },*/
];

export default mockProducts;
