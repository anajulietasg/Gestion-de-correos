import { Filtro } from "./Filtro";

export class RegistroFiltros {
    private _filtros: Filtro[] = [];

    registrar(filtro: Filtro): void {
        if (this._filtros.length >= 5) {
            throw new Error("No se pueden registrar más de cinco filtros");
        }

        if (this._filtros.some(f => f.nombre === filtro.nombre)) {          //some revisa si alguno ya tiene ese nombre
            throw new Error("Ya existe un filtro con ese nombre");
        }

        this._filtros.push(filtro);
    }

    obtenerTodos(): Filtro[] {
        return [...this._filtros];
    }
}