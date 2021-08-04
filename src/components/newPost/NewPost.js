import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function NewPost() {
  return (
    <div>
      <h1>NewPost</h1>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data='<p>Hello from CKEditor 5!</p>'
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
          }}
        />
        <button>제출</button>
      </div>
    </div>
  );
}

export default NewPost;
