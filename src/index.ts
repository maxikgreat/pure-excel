import './scss/index.scss';
import {Excel, Formula, Header, Table, Toolbar} from '@components/index';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
});

excel.render();
