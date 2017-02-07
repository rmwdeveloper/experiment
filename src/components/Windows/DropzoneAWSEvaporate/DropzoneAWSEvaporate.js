import React, { PropTypes, Component } from 'react';
import { evap_config } from '../../../config';
import Evaporate from 'evaporate';
import uuidV4 from 'uuid/v4';

export default function DropzoneAWSEvaporate(WrappedComponent, mode) {
  return class extends Component {
    static propTypes = {
    };
    constructor() {
      super();
      this.uploadComplete = this.uploadComplete.bind(this);
    }
    getUploadId() {
      const { user, isAnonymousUser } = this.props;
      return isAnonymousUser ? 0 : user.id;
    }
    uploadComplete(awsKey, temporaryUploadId, extension, size) {
      const parentIndex = mode === 'desktop' ? this.props.desktopNodeIndex : this.props.index;
      this.props.uploadComplete(temporaryUploadId, parentIndex, awsKey, extension, size);

    }
    componentDidMount() {
      const { checkAvailableSpace, diskSpace, uploadStart, uploadProgress, uploadError,  index, uniqueId } = this.props;

      const selector = mode === 'desktop' ? 'div#desktop' : `#folderContents${uniqueId}`;
      const parentIndex = mode === 'desktop' ? this.props.desktopNodeIndex : index;
      // START dropzone stuff. todo: abstract this crap away to a HOC
      // todo : dropzone script is in index.jade. Should be packed with webpack
      // todo: convert fetch to isomorphic fetch ?

      this.dropzone = new Dropzone(selector, {url: '/upload', autoProcessQueue:false, clickable: false, createImageThumbnails: false,
        previewsContainer: null,
        addedfile: file => {

          const { name, size, type } = file;
          const [fileName, extension] = name.split('.');
          const fileSizeMb = (size / 1000 / 1000).toFixed(2);
          const userId = this.getUploadId(); // todo : chagne this to getUserId
          const temporaryUploadId = uuidV4();

          checkAvailableSpace(fileName, extension, temporaryUploadId, parentIndex);

          fetch('/upload_start', {method: 'get', credentials: 'include'})
            .then(response => {
              response.json().then( responseObject => { // size in bytes
                const { usedSpace, date: { year, month, day, hours, minutes, seconds, milliseconds } } = responseObject;
                const mbUsed = (usedSpace / 1000 / 1000).toFixed(2); // usedSpace from server, not state.

                if ( diskSpace - mbUsed - fileSizeMb < 0) {
                  uploadError();
                  return null;
                }
                //todo: upload start action
                //todo: Some sort of auth here, prevent unauth uploads. Dont trust client.
                uploadStart(parseFloat(fileSizeMb, 10) + parseFloat(mbUsed, 10), temporaryUploadId);

                Evaporate.create(evap_config)
                  .then(
                    evaporate => {
                      evaporate.add({
                        name: `${userId}/${year}/${month}/${day}/${hours}${minutes}${seconds}${milliseconds}/${name}`,
                        file,
                        xAmzHeadersAtInitiate : {
                          'x-amz-acl': 'public-read'
                        },
                        progress: progressVal => {
                          const progressBar = document.getElementById(`progress${temporaryUploadId}`);
                          if (progressBar) {
                            progressBar.style.strokeDashoffset = 440 * (1 - progressVal);
                          }

                          // uploadProgress(progressVal, temporaryUploadId);
                        },
                        info: info => {},
                        error: error => {},
                        warn: warn => {},
                        complete: (xhr, awsObjectKey, stats) => {
                          this.uploadComplete(awsObjectKey, temporaryUploadId, extension, size);
                        }
                      })
                        .then(
                          awsKey => { },
                          reason => { }
                        ).catch(error=>{console.log(error);})
                    },
                    reason => {});
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      });


      // END DROPZONE STUFF
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
};
}

