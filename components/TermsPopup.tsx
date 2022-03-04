import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import {vs, s} from 'react-native-size-matters';

// COMPONENTS
import Icon from '../assets/icons'
import { colors } from '../StyleVariables';

const TermsPopup = ({onClose}: {onClose: Function}) => {
  return (
    <View style={styles.darkBackground}>
      <View style={styles.popupContainer}>

        <TouchableOpacity style={styles.closeButton}
          onPress={() => onClose()}
        >
          <Icon name="close" height={vs(20)} width={vs(20)} color={colors.primary} />
        </TouchableOpacity>

        
        <Text style={styles.title}>Términos y condiciones</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.paragraph}>
          Estos términos y condiciones describen las reglas y regulaciones para el uso del la aplicación móvil MercadoTec.
          La siguiente terminología se aplica a estos Términos y condiciones, Declaración de privacidad y Aviso de exención de responsabilidad y todos los Acuerdos: "Cliente", "Usted" y "Su" se refieren a usted, la persona que inicia sesión en esta aplicación y cumple con los términos y condiciones de la aplicación. "La Aplicación", "Nosotros mismos", "Nosotros", "Nuestro" y "Nosotros", se refieren a nuestra Compañía. "Parte", "Partes" o "Nosotros", se refiere tanto al Cliente como a nosotros mismos. Todos los términos se refieren a la oferta, aceptación y consideración del pago necesario para llevar a cabo el proceso de nuestra asistencia al Cliente de la manera más adecuada con el propósito expreso de satisfacer las necesidades del Cliente con respecto a la prestación de los servicios indicados por la aplicación, de conformidad con y sujeto a la legislación vigente de los Estados Unidos Mexicanos. Cualquier uso de la terminología anterior u otras palabras en singular, plural, mayúsculas y/o él/ella o ellos, se consideran intercambiables y, por lo tanto, se refieren a lo mismo.

          A menos que se indique lo contrario, MercadoTec y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en la aplicación. Todos los derechos de propiedad intelectual están reservados. Puede acceder a esto desde la aplicación para su uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
          Partes de esta aplicación ofrecen una oportunidad para que los usuarios publiquen e intercambien información. Las publicaciones de la aplicación no reflejan los puntos de vista ni las opiniones de MercadoTec, sus agentes y/o afiliados. Los comentarios reflejan los puntos de vista y las opiniones de la persona que publica sus puntos de vista y opiniones. En la medida en que lo permitan las leyes aplicables, MercadoTec no será responsable del contenido ni de ninguna responsabilidad, daño o gasto causado y/o sufrido como resultado de cualquier uso y/o publicación y/o aparición en esta aplicación.

          MercadoTec se reserva el derecho de monitorear todas las publicaciones y eliminar cualquier publicación que pueda considerarse inapropiada, ofensiva o que cause el incumplimiento de estos Términos y condiciones.
          {"\n"}
          Usted garantiza y declara que:
          {"\n"}
          *Tiene derecho a publicar anuncios de sus productos en nuestra aplicación y tiene todas las licencias y consentimientos necesarios para hacerlo;{"\n"}
          *La publicación no invade ningún derecho de propiedad intelectual, incluidos, entre otros, derechos de autor, patentes o marcas comerciales de terceros;{"\n"}
          *La publicación no contiene ningún material difamatorio, calumnioso, ofensivo, indecente o ilegal que sea una invasión de la privacidad.{"\n"}
          *La publicación no se utilizarán para solicitar o promover negocios o costumbres o presentar actividades ilegales.{"\n"}
          {"\n"}
          Por la presente, otorga a MercadoTec una licencia no exclusiva para usar, reproducir, editar y autorizar a otros a usar, reproducir y editar cualquiera de sus publicaciones en cualquiera y todas las formas, formatos o medios.

En la máxima medida permitida por la ley aplicable, excluimos todas las representaciones, garantías y condiciones relacionadas con nuestra aplicación y el uso de esta aplicación.
En la máxima medida permitida por la ley aplicable, excluimos todas las representaciones, garantías y condiciones relacionadas con nuestra aplicación y el uso de esta aplicación. Nada en este descargo de responsabilidad:
Limitará o excluirá nuestra o su responsabilidad por fraude o tergiversación fraudulenta;
Limitará cualquiera de nuestras responsabilidades o las suyas de cualquier manera que no esté permitida por la ley aplicable; o excluir cualquiera de nuestras o sus responsabilidades que no puedan ser excluidas bajo la ley aplicable.
Las limitaciones y prohibiciones de responsabilidad establecidas en esta Sección y en otras partes de este descargo de responsabilidad: (a) están sujetas al párrafo anterior; y (b) rigen todas las responsabilidades que surjan en virtud de la exención de responsabilidad, incluidas las responsabilidades que surjan por contrato, agravio y por incumplimiento del deber legal.

Éstos términos están sujetos a cambios, y en caso de alguna modificación y/o actualización en los términos y condiciones se les dará a conocer.
          </Text>
        </ScrollView>
      </View>
    </View>

  )
}

export default TermsPopup

const styles = StyleSheet.create({
  darkBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 5,
    paddingHorizontal: s(15),
    paddingVertical: vs(20),
  },
  closeButton: {
    position: 'absolute',
    top: vs(10),
    right: vs(10),
  },
  title: {
    marginVertical: vs(10),
    fontSize: vs(14),
    fontFamily: 'GorditaBold',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  scrollView: {
    height: vs(300),
  },
  paragraph: {
    fontFamily: 'GorditaRegular',
    fontSize: vs(9),
    paddingHorizontal: s(5),
    lineHeight: vs(11),
  },
})