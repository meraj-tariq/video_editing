import 'styled-components';
import { TTheme } from '../Theme/model';

declare module 'styled-components' {
	interface DefaultTheme extends TTheme {}
}
