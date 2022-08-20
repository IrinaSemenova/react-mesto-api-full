// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'http://domainfrontmesto.students.nomoredomains.sbs',
  'https://domainfrontmesto.students.nomoredomains.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
];
// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод)
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Headers', requestHeaders); // разрешаем кросс-доменные запросы с этими заголовками
    return res.end();// завершаем обработку запроса и возвращаем результат клиенту
  }
  return next();
};
