import { HealthCheckResponseDto } from "./health-check-response-dto";

export default (): HealthCheckResponseDto => {
    const response = new HealthCheckResponseDto("SEGURIDAD EN SISTEMAS DE INFORMACION 2025");
    return response;
}