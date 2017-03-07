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
      link: 'https://truacademy.com',
      images: ['projects/tru/dashboard.png']
    },
    { name: 'Pagemaker',
      technologies: ['HTML', 'LESS', 'Django REST Framework', 'React', 'Webpack',
         'Javascript', 'React', 'PostgreSQL' ],
      role: 'Full Stack Web Developer',
      description: 'Create your own landing page using a drag and drop interface.',
      link: '/pagemaker',
      images: ['projects/pm/pm.png']
    },
    { name: 'Lecture Editor',
      technologies: ['HTML', 'LESS', 'Django REST Framework', 'React', 'Webpack',
        'Javascript', 'PostgreSQL' ],
      role: 'Full Stack Web Developer',
      description: 'https://truacademy.com',
      link: ''
    },
  ],
  personalProjects: [
    { name: 'Online Desktop',
      technologies: ['HTML', 'CSS', 'PostCSS', 'Django REST Framework', 'React', 'Webpack',
        'Javascript', 'React', 'PostgreSQL' ],
      description: 'Upload, download, and organize files in an interface that looks like windows desktop. ',
      images: ['projects/onlineDesktop/main.png'],
      link: '/windows'
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
