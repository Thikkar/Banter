import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ChatService]
})
export class NewsComponent implements OnInit {

  currUser: any = JSON.parse(sessionStorage.currUser);

  chosenArticle: any;
  allArticles: any;
  news: any;
  team: string = '';
  month: number = 1;
  day: number = 1;
  year: number = 2021; //or have string for those three
  startDate: string = '';
  endDate: string = '';
  page: number = 1;

  constructor(private _http: HttpService, private _data: DataService, private _chat: ChatService) { 
    if (!this.currUser) {
      this.currUser = {
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        favTeam: "cardinals"
      }
    }

    const titleFilter = { title: null };

    this._http.getArticles("").subscribe((data: any) => {
      this.allArticles = data;
    });
  }

  ngOnInit(): void {
    this._http.getNews(this.team, this.startDate, this.endDate, this.page.toString()).subscribe(data => {
      this.news = data;
      for (var article of this.news.articles) {
        if (article) {
          this.addArticle(article.title, article.author, article.content, article.url, article.urlToImage);
        }
      }
    });
  }

  changeTeam(newTeam: string) {
    this.team = newTeam;
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
    });
  }
/*
  async findArticle(articleTitle: string) {
    console.log("In findArticle()")
    
    await this._http.getArticles().subscribe((data: any) => {
      console.log(data)
      this.chosenArticle = data.filter((a: { title: any; }) => a.title === "Test Title")[0]
      console.log(this.chosenArticle)
    });
    //console.log(this.allArticles)
  }
  */

  changeArticle(newArticle: any) {
    this.addArticle(newArticle.title, newArticle.author, newArticle.content, newArticle.url, newArticle.urlToImage)
    this.chosenArticle = this.allArticles.filter((a: { title: any; }) => a.title === newArticle.title)[0]
    console.log(this.chosenArticle)

    sessionStorage.setItem('chosenArticle', JSON.stringify(this.chosenArticle));

    let articleComments = []
    for (var comemntObject of this.chosenArticle.comments) {
      articleComments.push(comemntObject.comment)
    }
    sessionStorage.setItem('comments', JSON.stringify(articleComments));
    sessionStorage.setItem('commentObjects', JSON.stringify(this.chosenArticle.comments))


    this._data.changeArticle(this.chosenArticle)

    const joinData = {
      "username": this.currUser.username,
      "article": this.chosenArticle._id
    }

    this._chat.joinRoom(joinData);
  }

  async articleToID(article: any) {
    //console.log(this.allArticles)
    
    const articleFromDB = await this.allArticles.filter((a: { title: any; }) => a.title == article.title)[0]
    console.log(articleFromDB)
    return articleFromDB._id;
  }

  // have to test with articles that have not been stored in db yet (articleToID)

  nextPage() {
    this.page += 1;
  }

  prevPage() {
    if (this.page == 1) return;
    this.page -= 1;
  }



}
