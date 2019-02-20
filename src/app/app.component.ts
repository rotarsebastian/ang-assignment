import { Component } from "@angular/core";
import { ArraySortPipe } from "./sort.pipe";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [ArraySortPipe]
})
export class AppComponent {
  yourName: string = "";
  yourComment: string = "";
  createComment = false;
  ratings = ["Set Rating"];

  constructor(private sortPipe: ArraySortPipe) {}

  dish: {} = {
    name: "Uthapizza",
    image:
      "https://thestingyvegan.com/wp-content/uploads/2017/10/vegan-nacho-pizza-photo.jpg",
    category: "mains",
    label: "Hot",
    price: "4.99",
    description:
      "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
    comments: [
      {
        rating: 5,
        comment: "Imagine all the eatables, living in conFusion!",
        author: "John Lemon",
        date: "2012-10-16T17:57:28.556094Z"
      },
      {
        rating: 4,
        comment:
          "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
        author: "Paul McVites",
        date: "2014-09-05T17:57:28.556094Z"
      },
      {
        rating: 3,
        comment: "Eat it, just eat it!",
        author: "Michael Jaikishan",
        date: "2015-02-13T17:57:28.556094Z"
      },
      {
        rating: 4,
        comment: "Ultimate, Reaching for the stars!",
        author: "Ringo Starry",
        date: "2020-12-02T17:57:28.556094Z"
      },
      {
        rating: 2,
        comment: "It's your birthday, we're gonna party!",
        author: "25 Cent",
        date: "2017-03-05T17:57:28.556094Z"
      }
    ]
  };

  sortBy(form: NgForm) {
    const value = form.value;
    console.log(form.value);
    const array = this.dish["comments"];
    this.sortPipe.transform(array, value.choice);
  }

  newComment(author: string, comment: string) {
    const date = new Date().toISOString();
    const newComment = {
      rating: 5,
      comment: comment,
      author: author,
      date: date
    };
    this.dish["comments"].push(newComment);
  }

  writeComment(form: NgForm) {
    console.log(form);
    const author = form.value.author;
    const comment = form.value.comment;
    this.newComment(author, comment);
    form.reset();
    this.createComment = false;
  }

  startWritingComment(event: any) {
    if ((<HTMLInputElement>event.path[0]).localName === "input") {
      this.yourName = (<HTMLInputElement>event.target).value;
    } else {
      this.yourComment = (<HTMLInputElement>event.target).value;
    }
    if ((this.yourComment && this.yourName) === "") {
      this.createComment = false;
    } else {
      this.createComment = true;
    }
  }
}
