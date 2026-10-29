///Dice si un texto tiene formato de email. Solo valída.
export class ValidadorEmail {
    //pide texto sin espacios, un @, texto, un punto y más texto
    private static readonly FORMATO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    static esValido(email: string): boolean {
        return ValidadorEmail.FORMATO.test(email);
    }   
    //no hace falta crear un objeto porque no guarda ningún dato propio
    //recibe un texto y devuelve verdadero o falso
}