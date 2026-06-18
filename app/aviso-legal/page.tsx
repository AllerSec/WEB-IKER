import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata = {
  title: "Aviso Legal · VirtuoSolve",
  description:
    "Información legal del titular del sitio web VirtuoSolve, conforme a la Ley 34/2002 (LSSI-CE).",
};

export default function AvisoLegalPage() {
  return (
    <LegalLayout title="Aviso Legal" updated="12 de junio de 2026">
      <h2>1. Identificación del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
        Servicios de la Sociedad de la Información y de Comercio Electrónico
        (LSSI-CE), se informa de los siguientes datos identificativos del
        titular del sitio web:
      </p>
      <ul>
        <li>
          <strong>Titular:</strong> [NOMBRE COMPLETO O RAZÓN SOCIAL]
        </li>
        <li>
          <strong>NIF / CIF:</strong> [NIF/CIF]
        </li>
        <li>
          <strong>Domicilio:</strong> [DOMICILIO FISCAL COMPLETO]
        </li>
        <li>
          <strong>Correo de contacto:</strong> [EMAIL_CONTACTO]
        </li>
        <li>
          <strong>Sitio web:</strong>{" "}
          <a href="https://virtuosolve.com">https://virtuosolve.com</a>{" "}
          [SUSTITUIR POR DOMINIO REAL]
        </li>
        <li>
          <strong>Datos registrales (si aplica):</strong> [REGISTRO MERCANTIL,
          TOMO, FOLIO, HOJA — SOLO SI ES SOCIEDAD]
        </li>
      </ul>

      <h2>2. Objeto del sitio</h2>
      <p>
        Este sitio web tiene como finalidad presentar los servicios
        profesionales que el titular ofrece en materia de automatizaciones,
        asistentes de inteligencia artificial y desarrollo de aplicaciones a
        medida, así como facilitar a los usuarios un canal de contacto para
        solicitar información o servicios.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso al sitio es gratuito y no requiere registro previo. El uso
        del sitio atribuye al visitante la condición de usuario e implica la
        aceptación de las condiciones recogidas en este Aviso Legal, en la{" "}
        <a href="/privacidad">Política de Privacidad</a> y en la{" "}
        <a href="/cookies">Política de Cookies</a>.
      </p>
      <p>
        El usuario se compromete a hacer un uso lícito y diligente del sitio,
        absteniéndose de cualquier actuación que pueda dañar, sobrecargar,
        deteriorar o impedir el normal funcionamiento del mismo o de los
        sistemas que lo soportan, así como de introducir o difundir contenidos
        contrarios a la ley, al orden público o a los derechos de terceros.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio web (textos, diseño gráfico, código
        fuente, logotipos, marcas, ilustraciones, imágenes, animaciones y
        cualquier otro material) son titularidad del titular del sitio o de
        terceros que han autorizado su uso, y están protegidos por la
        legislación nacional e internacional sobre propiedad intelectual e
        industrial.
      </p>
      <p>
        Queda prohibida la reproducción total o parcial, comunicación pública,
        distribución, modificación, transformación o cualquier otra forma de
        explotación de los contenidos, en cualquier soporte y por cualquier
        medio, sin la autorización previa y por escrito del titular. El uso
        no autorizado podrá dar lugar a las acciones legales correspondientes.
      </p>

      <h2>5. Enlaces a terceros</h2>
      <p>
        El sitio puede contener enlaces a páginas externas sobre las que el
        titular no ejerce control. La inclusión de estos enlaces no implica
        respaldo, recomendación ni asunción de responsabilidad alguna sobre
        sus contenidos, políticas de privacidad o prácticas comerciales.
      </p>

      <h2>6. Exclusión de responsabilidad</h2>
      <p>
        El titular procura mantener el sitio operativo y los contenidos
        actualizados, pero no garantiza la ausencia de interrupciones,
        errores u omisiones. En la medida permitida por la ley, queda
        excluida la responsabilidad por cualquier daño o perjuicio derivado
        del uso del sitio, de la imposibilidad de acceder al mismo, de la
        existencia de virus o de la presencia de información incorrecta o
        incompleta.
      </p>

      <h2>7. Modificaciones</h2>
      <p>
        El titular se reserva el derecho a modificar, en cualquier momento y
        sin previo aviso, la presentación, configuración y contenidos del
        sitio, así como las condiciones recogidas en este Aviso Legal. La
        versión vigente será siempre la publicada en esta página.
      </p>

      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>
        Este Aviso Legal se rige por la legislación española. Para la
        resolución de cualquier controversia, las partes se someten a los
        Juzgados y Tribunales del domicilio del titular, salvo cuando la
        normativa de consumo establezca un fuero distinto e imperativo.
      </p>
    </LegalLayout>
  );
}
