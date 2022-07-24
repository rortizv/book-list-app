import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from '../../services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../../models/book.model';

const listBook: Book[] = [
    {
        name: '',
        author: '',
        isbn: '',
        price: 150000,
        amount: 2
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 200000,
        amount: 1
    },
    {
        name: '',
        author: '',
        isbn: '',
        price: 80000,
        amount: 7
    }
];


describe('Cart component', () => {

    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                CartComponent
            ],
            providers: [
                BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach( () => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);
        spyOn(service, 'getBooksFromCart').and.callFake( () => listBook);
    });

    it('Debe crear componente', () => {
        expect(component).toBeTruthy();
    });


    it('getTotalPrice debe retornar un monto', () => {
        const totalPrice = component.getTotalPrice(listBook);
        expect(totalPrice).toBeGreaterThan(0);
        expect(totalPrice).not.toBeNull();
    });

    it('onInputNumberChange incrementa correctamente', () => {
        const action = 'plus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 150000,
            amount: 2
        };

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake( ()=> null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake( ()=> null);

        expect(book.amount).toBe(2);
        
        component.onInputNumberChange(action, book);

        expect(book.amount === 3).toBeTrue();

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

    });    
    

    it('onInputNumberChange decrementa correctamente', () => {
        const action = 'minus';
        const book = {
            name: '',
            author: '',
            isbn: '',
            price: 150000,
            amount: 3
        };

        expect(book.amount).toBe(3);

        const spy1 = spyOn(service, 'updateAmountBook').and.callFake( ()=> null);
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake( ()=> null);
        
        component.onInputNumberChange(action, book);

        expect(book.amount).toBe(2);

        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();

    });

    // Probando un método público
    it('onClearBooks limpia el array de libros correctamente', () => {
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake( () => null);
        component.listCartBook = listBook;
        component.onClearBooks();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });


    // Probando un método privado
    it('_clearListCartBook limpia el array de libros correcgtamente', () => {
        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake( () => null);
        component.listCartBook = listBook;
        component["_clearListCartBook"]();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
    });

});