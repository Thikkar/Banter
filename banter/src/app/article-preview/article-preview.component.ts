import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {

  @Input() article: any;
  allArticles: any;
  chosenArticle: any;
  articleFromDB: any;

  constructor(private _http: HttpService, private _data: DataService, private _chat: ChatService) { 

    this._http.getArticles("").subscribe(data => {
      this.allArticles = data;
    });

   }

  ngOnInit(): void {
    //fetches the article from DB, potential usage for route (UNIMPLEMENTED)
    this._http.getArticles(this.article.title).subscribe(data => {
      this.articleFromDB = data;
    });
  }

  addArticle(title: any, author: any, body: any, article_url: any, image_url: any) {
    const articleDetails = {
      "title": title,
      "author": author,
      "body": body,
      "article_url": article_url,
      "image_url": image_url
    }

    this._http.addArticle(articleDetails).subscribe(data => {
      console.log(data);
    });
  }

  async changeArticle(newArticle: any) {
    //this.addArticle(newArticle.title, newArticle.author, newArticle.content, newArticle.url, newArticle.urlToImage)
    const titleFilter = { title: newArticle.title }
    console.log(newArticle.title)
    this.chosenArticle = this.allArticles.filter((a: { title: any; }) => a.title === newArticle.title)[0]
    /*await this._http.getArticles(newArticle.title).subscribe(data => {
      this.chosenArticle = data
      console.log(data)
    })*/

    sessionStorage.setItem('chosenArticle', JSON.stringify(this.chosenArticle));

    let articleComments = []
    for (var commentObject of this.chosenArticle.comments) {
      articleComments.push(commentObject.comment)
    }
    sessionStorage.setItem('comments', JSON.stringify(articleComments));
    sessionStorage.setItem('commentObjects', JSON.stringify(this.chosenArticle.comments))

    //not needed?
    this._data.changeArticle(this.chosenArticle)
  }

  articleToID(article: any) {
    const articleFromDB = this.allArticles.filter((a: { title: any; }) => a.title == article.title)[0]
    /*const titleFilter = { title: article.title }
    this._http.getArticles(article.title).subscribe(data => {
      this.articleFromDB = data;
    });*/
    return articleFromDB._id.toString();
  }

}
