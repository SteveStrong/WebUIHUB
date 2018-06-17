import { Component, OnInit } from '@angular/core';

import * as signalr from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebUIHUB app';
  messages: Array<string> = [];
  inputMessage: string;
  connectionHub: signalr.HubConnection;

  ngOnInit(): void {
    this.connectionHub = new signalr.HubConnectionBuilder()
      .withUrl('http://localhost:5000/app')
      .build();

      this.connectionHub.start().catch(err => console.error(err.toString()));

      this.connectionHub.on('Send', data => {
        this.messages.push(data);
      });
  }

  //https://damienbod.com/2017/10/16/securing-an-angular-signalr-client-using-jwt-tokens-with-asp-net-core-and-identityserver4/

  sendMessage(text: string): void {
    this.inputMessage = text;
    this.connectionHub.invoke('Send', text);

    /// this.messages.push(text);
  }
}
