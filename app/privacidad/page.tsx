import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata = {
  title: "Política de Privacidad · VirtuoSolve",
  description:
    "Información sobre el tratamiento de datos personales en VirtuoSolve, conforme al RGPD y la LOPDGDD.",
};

export default function PrivacidadPage() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      updated="12 de junio de 2026"
    >
      <p>
        En cumplimiento del Reglamento (UE) 2016/679, General de Protección
        de Datos (RGPD), y de la Ley Orgánica 3/2018, de Protección de Datos
        Personales y garantía de los derechos digitales (LOPDGDD), se informa
        al usuario del tratamiento de sus datos personales en los siguientes
        términos.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> [NOMBRE COMPLETO O RAZÓN SOCIAL]
        </li>
        <li>
          <strong>NIF / CIF:</strong> [NIF/CIF]
        </li>
        <li>
          <strong>Domicilio:</strong> [DOMICILIO FISCAL COMPLETO]
        </li>
        <li>
          <strong>Email:</strong> [EMAIL_CONTACTO]
        </li>
      </ul>

      <h2>2. Datos que tratamos</h2>
      <p>
        A través del formulario de contacto recogemos los siguientes datos
        que el usuario nos facilita voluntariamente:
      </p>
      <ul>
        <li>Nombre</li>
        <li>Nombre de la empresa o proyecto</li>
        <li>Correo electrónico de contacto</li>
        <li>Rango de presupuesto orientativo</li>
        <li>Descripción libre del proyecto o consulta</li>
      </ul>
      <p>
        Asimismo, cuando el usuario navega por el sitio podemos recoger datos
        técnicos asociados a las cookies y tecnologías similares descritas en
        la <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>3. Finalidades y base legal del tratamiento</h2>
      <table>
        <thead>
          <tr>
            <th>Finalidad</th>
            <th>Base legal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Atender la solicitud de información o presupuesto enviada a
              través del formulario y mantener la comunicación posterior con
              el usuario.
            </td>
            <td>
              Consentimiento del usuario (art. 6.1.a RGPD) y, en su caso,
              ejecución de medidas precontractuales a petición del propio
              interesado (art. 6.1.b RGPD).
            </td>
          </tr>
          <tr>
            <td>
              Envío de comunicaciones comerciales sobre nuestros servicios
              (solo si el usuario lo acepta expresamente).
            </td>
            <td>Consentimiento expreso del usuario (art. 6.1.a RGPD).</td>
          </tr>
          <tr>
            <td>Cumplimiento de obligaciones legales y fiscales.</td>
            <td>Obligación legal (art. 6.1.c RGPD).</td>
          </tr>
          <tr>
            <td>Análisis estadístico anónimo de uso del sitio web.</td>
            <td>
              Interés legítimo del responsable (art. 6.1.f RGPD) o
              consentimiento del usuario cuando se utilicen cookies no
              técnicas.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>4. Plazo de conservación</h2>
      <p>
        Los datos del formulario se conservarán durante el tiempo
        estrictamente necesario para atender la solicitud y, posteriormente,
        durante los plazos de prescripción de las acciones legales
        derivadas de la relación o exigidos por la normativa fiscal y
        mercantil (con carácter general, hasta seis años desde la última
        interacción).
      </p>
      <p>
        Si el usuario solicita la supresión de sus datos antes de ese plazo,
        atenderemos la solicitud en los términos descritos en el apartado de
        derechos.
      </p>

      <h2>5. Destinatarios y transferencias</h2>
      <p>
        No cedemos datos a terceros salvo obligación legal. Para la
        prestación del servicio podemos utilizar proveedores tecnológicos
        que actúan como encargados del tratamiento (alojamiento web, envío
        de correo, gestión del formulario, herramientas analíticas). Estos
        proveedores tratan los datos únicamente conforme a nuestras
        instrucciones y bajo contrato de encargo conforme al artículo 28
        RGPD.
      </p>
      <p>
        Si alguno de estos proveedores se encuentra fuera del Espacio
        Económico Europeo, garantizamos que la transferencia internacional
        se realiza con las salvaguardas previstas en el Capítulo V del RGPD
        (Cláusulas Contractuales Tipo, decisiones de adecuación, etc.).
        Puedes solicitar el listado actualizado de proveedores escribiendo a{" "}
        <a href="mailto:[EMAIL_CONTACTO]">[EMAIL_CONTACTO]</a>.
      </p>

      <h2>6. Derechos del interesado</h2>
      <p>
        Cualquier persona tiene derecho a obtener confirmación sobre si
        estamos tratando datos personales que le conciernan, y a ejercer
        los siguientes derechos:
      </p>
      <ul>
        <li>Acceder a sus datos.</li>
        <li>Solicitar la rectificación de datos inexactos.</li>
        <li>
          Solicitar la supresión de los datos cuando ya no sean necesarios
          para los fines para los que fueron recogidos.
        </li>
        <li>Solicitar la limitación de su tratamiento.</li>
        <li>Oponerse al tratamiento.</li>
        <li>Solicitar la portabilidad de los datos.</li>
        <li>Retirar el consentimiento prestado en cualquier momento.</li>
      </ul>
      <p>
        Para ejercer estos derechos puedes dirigirte por correo electrónico
        a <a href="mailto:[EMAIL_CONTACTO]">[EMAIL_CONTACTO]</a> indicando
        en el asunto el derecho que deseas ejercer y adjuntando copia de un
        documento que acredite tu identidad.
      </p>
      <p>
        Asimismo, te informamos del derecho a presentar una reclamación
        ante la Agencia Española de Protección de Datos (AEPD,{" "}
        <a
          href="https://www.aepd.es"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.aepd.es
        </a>
        ), especialmente cuando consideres que no has obtenido satisfacción
        en el ejercicio de tus derechos.
      </p>

      <h2>7. Seguridad</h2>
      <p>
        Aplicamos las medidas técnicas y organizativas apropiadas para
        garantizar un nivel de seguridad adecuado al riesgo del tratamiento,
        incluyendo el cifrado de las comunicaciones a través del sitio web
        y el control de accesos a los sistemas donde se almacenan los datos.
      </p>

      <h2>8. Menores</h2>
      <p>
        El sitio web no está dirigido a menores de 14 años. No recogemos de
        forma intencionada datos de menores de esa edad. Si tomamos
        conocimiento de que se han recogido datos de un menor sin
        autorización válida, procederemos a su supresión.
      </p>

      <h2>9. Cambios en la política</h2>
      <p>
        Esta Política de Privacidad puede ser actualizada para adaptarla a
        cambios legislativos o a la prestación de nuevos servicios. La
        versión vigente será siempre la publicada en esta página, con
        indicación de la fecha de última actualización.
      </p>
    </LegalLayout>
  );
}
