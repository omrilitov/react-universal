import * as Colors from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import zIndex from 'material-ui/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.indigo500,
    primary2Color: Colors.indigo300,
    primary3Color: Colors.indigo700,
    accent1Color: Colors.greenA200,
    accent2Color: Colors.greenA100,
    accent3Color: Colors.greenA700,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.blueGrey50,
    borderColor: Colors.blueGrey300,
    disabledColor: fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.cyan500
  }
};