import { Component } from '@angular/core';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.component.html',
  styleUrls: ['./recomendaciones.component.css']
})
export class RecomendacionesComponent {
  cards = [
    {
      title: 'Bar La Noche',
      image: 'assets/newimg/restaurant.jpg',
      description: 'Un lugar acogedor para tomar algo y escuchar música en vivo.',
      rating: 4
    },
    {
      title: 'Restaurante Luna',
      image: 'assets/newimg/restaurante.jpg',
      description: 'Especialidades en mariscos y comida internacional.',
      rating: 5
    },
    {
      title: 'Café Central',
      image: 'assets/newimg/3.png',
      description: 'El mejor café artesanal de la ciudad.',
      rating: 3
    },
    {
      title: 'Club Eclipse',
      image: 'assets/newimg/4.png',
      description: 'Música electrónica y ambiente moderno.',
      rating: 4
    },
    {
      title: 'Pizzería Don Mario',
      image: 'assets/newimg/1.png',
      description: 'Auténtica pizza italiana hecha en horno de leña.',
      rating: 5
    }
  ];
}
