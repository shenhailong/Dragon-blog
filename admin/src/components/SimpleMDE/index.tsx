import React, { PureComponent } from 'react'
// @ts-ignore
import SimpleMDE from 'simplemde';
// @ts-ignore
import marked from 'marked';
// @ts-ignore
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
import {
  Input,
  Upload,
  Icon,
  message,
  Modal
} from 'antd';
const { TextArea } = Input;
interface IOwnProps {
  markdownChange: (value: string) => void
}

interface IDispatchProps {}

interface IStates {
  editor: any;
  init: boolean;
  visible: boolean;
  imageUrl: string;
  loading: boolean;
}

type IProps = IOwnProps & IDispatchProps;
class SimpleMarkdown extends PureComponent<IProps, IStates> {
  constructor(props: Readonly<IProps>){
    super(props)
    this.state = {
      editor: null,
      init: true,
      visible: false,
      imageUrl: '',
      loading: false
    }
  }

  componentWillReceiveProps(data: any) {
    if(this.state.init){
      this.state.editor.value(data.value)
      this.setState({
        init: false
      })
    }
  }

  componentDidMount() {
    const {  } = this.props;
    const self = this;
    // console.log(this.props['data-__meta'].initialValue)
    this.setState({
      editor: new SimpleMDE({
        // @ts-ignore
        element: document.getElementById('content').childElementCount,
        autofocus: true,
        autosave: true,
        toolbar: [
          'bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', '|', 'quote',
          'code', 'quote', 'unordered-list', 'clean-block', 'link', 'table', 'horizontal-rule', 'preview','side-by-side', 'fullscreen', 'guide',
          {
            name: 'image',
            action: function customFunction(editor: any){
              self.setState({
                visible: true
              })
            },
            className: "fa fa-picture-o",
            title: "Custom Button",
          },
        ],
        previewRender(plainText: any) {
          return marked(plainText, {
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight(code: any) {
              return highlight.highlightAuto(code).value;
            },
          });
        },
      })
    }, () => {
      this.state.editor.codemirror.on('change', () => {
        this.props.markdownChange(this.state.editor.value())
      });
    })
  }

  handleOk = () => {
    let editor = this.state.editor
    editor.value(editor.value() + `![](${this.state.imageUrl})`)
    this.setState({
      visible: false,
      imageUrl: ''
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    let self = this
    const props = {
      name: 'file',
      showUploadList: false,
      action: '/api/v1/upload',
      headers: {
        authorization: 'authorization-text',
      },
      accept: 'image/*',
      beforeUpload(file: any) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
      },
      onChange(info: any) {
        console.log(info)
        if (info.file.status !== 'uploading') {
          self.setState({ loading: true })
        }
        if (info.file.status === 'done') {
          let url = info.file.response.data.path
          self.setState({
            imageUrl: url,
            loading: false
          })
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div>
        <TextArea rows={6} id={'content'}/>
        <Modal
          title="Title"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={this.state.loading}
        >
          <Upload name="logo" {...props} listType="picture-card">
           {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Modal>
      </div>
    )
  }
}

export default SimpleMarkdown
