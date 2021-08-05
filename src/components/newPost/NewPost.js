import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ReactHtmlParser from 'react-html-parser';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function NewPost() {
  const [content, setContent] = useState('');

  let data;

  function handler() {
    setContent(data);
  }

  return (
    <div>
      <h1>NewPost</h1>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data=''
          onChange={(event, editor) => {
            data = editor.getData();
          }}
        />
        <button onClick={handler}>제출</button>
      </div>
      <div>{ReactHtmlParser(content)}</div>
    </div>
  );
}

export default NewPost;
