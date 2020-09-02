const express = require('express');

const app = express();

app.get('/pets', (request, response) => {
    return response.json([ 
        'lulu',
        'xuxa',
        'billu',
    ]);
});

app.post('/pets', (request, response) => {
    return response.json([ 
        'lulu',
        'xuxa',
        'billu',
        'zika',
    ]);
});

app.put('/pets/:id', (request, response) => {
    return response.json([ 
        'toto',
        'xuxa',
        'billu',
        'zika',
    ]);
});

app.delete('/pets/:id', (request, response) => {
    return response.json([ 
        'toto',
        'xuxa',
        'zika',
    ]);
});



app.listen(3333, () => {
    console.log('backend started! 🍺');
});