import { encode } from "./lib.js";
import Button from '@components/Button';
import formatLabel from '@utils/helpers';

const button = new Button(formatLabel('label'));
console.log(encode("http://localhost:8080"));
