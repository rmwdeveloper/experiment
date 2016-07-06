import React, { PropTypes } from 'react';


const title = 'React Starter Kit';

function Home({ news }, context) {
    context.setTitle(title);
    return (
        <div> Hello World</div>
    );
}

Home.contextTypes = { setTitle: PropTypes.func.isRequired };

export default Home;