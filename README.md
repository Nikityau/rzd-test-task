# Кроссплатформенный сервис отоборажения занятости участков станции в реальном времени

## Клиент

> Технлогии
>- React
>- socket.io-client
>- typescript

Реализован алгоритм по отрисовке пути из приходящего графа, так же показ занятого пути исходя из данных с сервера

> Пример графа пути

```ts
const routeGraph = {
    "0": [
        {
            id: v4(),
            pointName: "s1"
        }
    ],
    "s1": [
        {
            id: v4(),
            pointName: "s2",
        },
        {
            id: v4(),
            pointName: "u0",
            rotate: -60
        },
        {
            id: v4(),
            pointName: "b1",
            rotate: 60
        }
    ],
    "s2": [
        //...
    ],
    // ...
}

```

Для правильного отображения необходимо задать уникальное имя сектора пути(pointName), так же
указать правильный маршрут, на данном этапе реализована возможность построения горизонтального
пути с небольшим отклоением вверх или вниз, угол отходящего пути должен быть 60 или -60 градусов.

## Сервер

> Технологии
> - NodeJs
> - Express
> - socket.io
> - typescript

Реализовано работа с графом пути, слежение за тем как поезд двигается по пути, если есть выбор между более чем одним
участком пути, выбор происходит случайно. Слежение идет каждые 2 секунды. После обновления данных об учаске, сервер
по протоколу WebSocket, отправляет на клиент информацию:
> - о текущем участке(граф пути)
> - о поезде, который на данный момент на участке
> - путь который поезд прошел
> - занятые участки пути


## Запуск

### используеться терминал
### необходимо иметь установелнный NodeJs LTS версии

Первым делом сервер запускать

> Сервер
> - перейти в папку server
> - установить пакеты, команда в терминале npm i
> - дальше запустить командой npm run dev

> Клиент
> - перейти в папку client-react
> - установить пакеты, команда в терминале npm i
> - дальше запустить командой npm run dev
> - после развернеться в бразуере дев версия, и через пару секнуд начнетсья отрисовка