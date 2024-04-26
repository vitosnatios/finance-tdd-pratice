import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(import.meta.env.VITE_SERVER_URL + '/api/auth/jwt', () => {
    return HttpResponse.json({
      user: {
        _id: '66259e0d1fc173b1a72854e3',
        username: 'asd',
        email: 'asd@asd',
        firstName: 'asd',
        lastName: 'asd',
        __v: 0,
      },
      expenses: [
        {
          _id: '66271e27672d4a3f7cb4b626',
          userId: '66259e0d1fc173b1a72854e3',
          category: 'asd',
          price: 123,
          date: 'Mon Apr 22 2024 23:34:15 GMT-0300 (Horário Padrão de Brasília)',
        },
        {
          _id: '6627220cebc60c5d40483d99',
          userId: '66259e0d1fc173b1a72854e3',
          category: 'asd',
          price: 123,
          date: 'Mon Apr 22 2024 23:50:52 GMT-0300 (Horário Padrão de Brasília)',
        },
      ],
    });
  }),

  http.post(import.meta.env.VITE_SERVER_URL + '/api/expense/create', () => {
    return HttpResponse.json({
      _id: '123123',
      userId: '66259e0d1fc173b1a72854e3',
      category: 'Food',
      price: 3,
      date: 'Mon Apr 22 2024 23:50:52 GMT-0300 (Horário Padrão de Brasília)',
    });
  }),

  http.post(import.meta.env.VITE_SERVER_URL + '/api/user/login', () => {
    return HttpResponse.json({ jwt: 'jwt-test' });
  }),

  http.post(import.meta.env.VITE_SERVER_URL + '/api/user/create', () => {
    return HttpResponse.json({ jwt: 'jwt-test' });
  }),

  http.post(import.meta.env.VITE_SERVER_URL + '/api/expense/create', () => {
    return HttpResponse.json({
      expense: {
        _id: '666',
        userId: '66259e0d1fc173b1a72854e3',
        category: 'asd',
        price: 123,
        date: 'Mon Apr 22 2024 23:50:52 GMT-0300 (Horário Padrão de Brasília)',
      },
    });
  }),
];
