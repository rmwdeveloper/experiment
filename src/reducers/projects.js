import {

} from '../constants';

const initialState = {
  professionalProjects: [
    { name: 'Truacademy',
      technologies: ['HTML', 'CSS', 'LESS', 'Python', 'Django', 'React', 'Webpack',
      'gulp.js', 'Javascript', 'React', 'PostgreSQL', 'jQuery'],
      role: 'Full Stack Web Developer',
      description: '',
      link: ''
    },
    { name: 'Pagemaker',
      technologies: ['HTML', 'LESS', 'Django REST Framework', 'React', 'Webpack',
         'Javascript', 'React', 'PostgreSQL' ],
      role: 'Full Stack Web Developer',
      description: '',
      link: ''
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
    },
  ]
};

export default function projects(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
