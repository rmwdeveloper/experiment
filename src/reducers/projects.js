import {
  SELECT_FILTER
} from '../constants';

const initialState = {
  professionalProjects: [
    { name: 'Truacademy',
      technologies: ['HTML', 'CSS', 'LESS', 'Python', 'Django', 'React', 'Webpack',
      'gulp.js', 'Javascript', 'React', 'PostgreSQL', 'jQuery'],
      role: 'Full Stack Web Developer',
      description: '',
      link: '',
      image: 'tru/dashboard.png'
    },
    { name: 'Pagemaker',
      technologies: ['HTML', 'LESS', 'Django REST Framework', 'React', 'Webpack',
         'Javascript', 'React', 'PostgreSQL' ],
      role: 'Full Stack Web Developer',
      description: '',
      link: '',
      image: 'pm/pm.png'
    },
    { name: 'Lecture Editor',
      technologies: ['HTML', 'LESS', 'Django REST Framework', 'React', 'Webpack',
        'Javascript', 'PostgreSQL' ],
      role: 'Full Stack Web Developer',
      description: '',
      link: ''
    },
  ],
  personalProjects: [
    { name: 'Online Desktop',
      technologies: ['HTML', 'CSS', 'PostCSS', 'Django REST Framework', 'React', 'Webpack',
        'Javascript', 'React', 'PostgreSQL' ],
      description: '',
      image: 'onlineDesktop/main.png'
    },
  ],
  selected: 'All'
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    case SELECT_FILTER:
      return { ...state, selected: action.filter };
    default:
      return state;
  }
}
