const coches = [
	{
		id: 1,
		nombre: 'Bugatti Chiron',
		potencia: 1500,
		motor: '8.0 litros W16',
		foto: 'images/bugatti.jpg',
	},
	{
		id: 2,
		nombre: 'Koenigsegg Jesko',
		potencia: 1600,
		motor: 'V8 de 5.0 litros',
		foto: 'images/jesko.jpg',
	},
	{
		id: 3,
		nombre: 'Hennessey Venom F5',
		potencia: 1800,
		motor: 'V8 de 6.6 litros',
		foto: 'images/venom.jpg',
	},
	{
		id: 4,
		nombre: 'Rimac C_Two',
		potencia: 1900,
		motor: 'Eléctrico',
		foto: 'images/rimac.jpg',
	},
	{
		id: 5,
		nombre: 'Lamborghini Sian',
		potencia: 800,
		motor: 'V12 híbrido',
		foto: 'images/sian.jpg',
	},
];
const cardsCoches = document.querySelector('#cardsCoches');
const slcCoche1 = document.querySelector('#slcCoche1');
const slcCoche2 = document.querySelector('#slcCoche2');
const btnComparar = document.querySelector('#btnComparar');
const errComparar = document.querySelector('#errComparar');
const resComparar = document.querySelector('#resComparar');
const iptBuscar = document.querySelector('#iptBuscar');
const btnBuscar = document.querySelector('#btnBuscar');
const errBuscar = document.querySelector('#errBuscar');
const resBuscar = document.querySelector('#resBuscar');

const cardCoche = (coche) => {
	return `
    <div class="card">
        <img src="${coche.foto}" />
        <div class="card-body">
            <h3>${coche.nombre}</h3>
            <p>Potencia: ${coche.potencia} CV</p>
            <p>Motor: ${coche.motor}</p>
        </div>
    </div>
    `;
};

const getCocheId = (id) => {
	return coches.find((c) => c.id == id);
};

const opcionesCoches = () => {
	return `
    <option value="">Selecciona una opción</option>
    ${coches.map((c) => `<option value="${c.id}">${c.nombre}</option>`).join('')}
    `;
};

const tablaComparar = (c1, c2) => {
	return `
    <table>
        <thead>
            <tr>
                <td>Características</td>
                <td>${c1.nombre}</td>
                <td>${c2.nombre}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Potencia</td>
                <td>${c1.potencia}</td>
                <td>${c2.potencia}</td>
            </tr>
            <tr>
                <td>Motor</td>
                <td>${c1.motor}</td>
                <td>${c2.motor}</td>
            </tr>
        </tbody>
    </table>
    `;
};

const horaActual = () => {
	const ahora = new Date();
	const h = String(ahora.getHours()).padStart(2, '0');
	const m = String(ahora.getMinutes()).padStart(2, '0');

	return `${h}:${m}`;
};

const listaResultado = (lista, hora) => {
	if (!lista.length) {
		return `
        <strong>Búsqueda hecha a las: ${hora}</strong>
        <p>No se han encontrado coches</p>
        `;
	}
	return `
    <strong>Búsqueda hecha a las: ${hora}</strong>
    <ul>
        ${lista.map((c) => `<li>${c.nombre} - ${c.potencia}</li>`).join('')}
    </ul>
    `;
};
btnComparar.addEventListener('click', () => {
	const c1 = slcCoche1.value;
	const c2 = slcCoche2.value;
	resComparar.innerHTML = '';
	if (!c1 || !c2) {
		errComparar.innerHTML = 'Selecciona dos coches';
		return;
	}
	if (c1 === c2) {
		errComparar.innerHTML = 'Selecciona dos coches diferentes';
		return;
	}
	errComparar.innerHTML = '';

	resComparar.innerHTML = tablaComparar(getCocheId(c1), getCocheId(c2));
});
btnBuscar.addEventListener('click', () => {
	const valor = parseInt(iptBuscar.value.trim());
	resBuscar.innerHTML = '';
	if (!valor || valor < 0) {
		errBuscar.innerHTML = 'Introduce un valor válido';
		return;
	}
	errBuscar.innerHTML = '';
	const res = coches.filter((c) => c.potencia > valor);
	resBuscar.innerHTML = listaResultado(res, horaActual());
});

cardsCoches.innerHTML = coches.map((c) => cardCoche(c)).join('');
slcCoche1.innerHTML = opcionesCoches();
slcCoche2.innerHTML = opcionesCoches();
