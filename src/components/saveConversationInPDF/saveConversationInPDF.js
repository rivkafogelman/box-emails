import { drawDOM, exportPDF } from '@progress/kendo-drawing';
import $ from 'jquery';

class DocService {
  dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  createPdf = (html, jwt, returnClassFunction) => {
    let child1 = html.children[0].children[1]
    let child2 = html.children[0].children[2]
    let child3 = html.children[2].children[0].children[html.children[2].children[0].children.length - 2]
    html.children[0].removeChild(html.children[0].children[2])
    html.children[0].removeChild(html.children[0].children[1])
    html.children[2].children[0].removeChild(html.children[2].children[0].children[html.children[2].children[0].children.length - 2])

    const url = window.location;
    const userName = (url.pathname.split('/')[1]) === "admin" ? (url.pathname.split('/')[2]) : (url.pathname.split('/')[1]);
    const paperName = (url.pathname.split('/')[1]) === "admin" ? (url.pathname.split('/')[3]) : (url.pathname.split('/')[2]);
    drawDOM(html, {
      fileName: 'paper.pdf',
    })
      .then((group) => {
        returnClassFunction(child1, child2, child3)
        return exportPDF(group, {
          // paperSize: "A4",
          margin: "20pt",
          fontFamily: "CODE2000",
          landscape: true,
          // padding: {bottom: 200}
        });
      }).then((dataUri) => {
        const file = this.dataURLtoFile(dataUri, "paper.pdf")
        console.log(file)
        var myFile = new FormData()
        myFile.append("file", file)

        $.ajax({
          type: "POST",
          url: "https://files.codes/api/" + userName + "/upload",

          headers: { Authorization: jwt },
          data: myFile,
          processData: false,
          contentType: false,
          success:
            console.log('success')
        })
          .then((res) => {
            console.log(res, "ressssss")
            //this.downloadPDF(userName, res, jwt)
            // let link = document.createElement('a');
            // link.href = ''
            // link.download = paperName;
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
            window.open(`https://files.codes/api/${userName}/download/${res.data.url}?jwt=${jwt}`)
            // this.downloadPDF('sarac', res, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtaXRtZnFVd3A2TWZoZ0xidTI3WmwwMGFkUUQzIiwiZW1haWwiOiJzYXJhQGxlYWRlci5jb2RlcyIsImlhdCI6MTYyMDAyMzE2OX0.J5tRO7h6-vAJ3DwSYyF2u3Eyw1EF9JN_JiSJeXCUkiM')
            // this.downloadPDF(userName, res, jwt)
          })
      })
      .catch(() => {
        returnClassFunction(child1, child2, child3)
      })
  }

  // CreatePdf = (src, fonts, dest) => {
  //   let properties = new ConverterProperties();
  //   let fontProvider = new DefaultFontProvider(false, false, false);
  //   for (let i = 0; i < fonts.length; i++) {
  //       let fontProgram = FontProgramFactory.createFont(fonts[i]);
  //       fontProvider.addFont(fontProgram);
  //   }
  //   properties.setFontProvider(fontProvider);
  //   HtmlConverter.convertToPdf(new File(src), new File(dest), properties);
  // }

  downloadPDF = (userName, res, jwt) => {
    $.ajax({
      type: "GET",
      url: "https://files.codes/api/" + userName + "/download/" + res.data.url,
      // headers: { Authentication: jwt },
      headers: { Authorization: jwt },

      success: function (data) {
        window.open(`https://files.codes/api/${userName}/download/${res.data.url}`)

        //alert('download')
      },
      error: function (err) {
        console.log(err);
      },
    });


  }
}

const Doc = new DocService();
export default Doc;