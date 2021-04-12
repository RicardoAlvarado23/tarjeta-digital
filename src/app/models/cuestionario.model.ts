export class Cuestionario {

    CodEvaluacion: string;
    FechaHoraInicio: string;
    TiempoEvaluacion: number;
    Preguntas: Pregunta[]
}

export class Pregunta {
    CodPregunta: number;
    DesPregunta: string;
    Alternativas: Alternativa[];
}

export class Alternativa {
    CodAlternativa: number;
    DesAlternativa: string;
}

export class Respuesta {
    codigoPregunta: number;
    codigoRespuesta: number;
    constructor (codigoPregunta: number) {
        this.codigoPregunta = codigoPregunta;
    }
}