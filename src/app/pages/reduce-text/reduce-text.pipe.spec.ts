import { ReduceTextPipe } from './reduce-text.pipe';

describe('ReduceTextPipe', () => {

    let pipe: ReduceTextPipe;

    beforeEach(() => {
        pipe = new ReduceTextPipe();
    });

    it('Debe crearlo', () => {
        expect(pipe).toBeTruthy();
    });

    it('Usa el transform correctamente', () => {
        const text = 'Hola, este es un test para verificar el pipe';
        const newText = pipe.transform(text, 5);
        expect(newText.length).toBe(5);
    });

});