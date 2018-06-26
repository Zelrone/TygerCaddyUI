import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { HostService } from '../../../services/host.service';
import { Host } from '../../../models/Host';

@Component({
  templateUrl: 'update.component.html'
})
export class UpdateComponent {

  host: Host;

  constructor(private route: ActivatedRoute, private http: HttpClient, private hostService: HostService) {
    this.ssl_provider = "letsencrypt";
  }

  isCollapsed: boolean = false;
  iconCollapse: string = "icon-arrow-up";
  ssl_provider: string;
  sub: any;
  page_title: string;
  type: string;
  id: number;

  setTitle(title, type) {
    this.page_title = title;
  }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(
        v => this.setTitle(v.title, v.type),
    );

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.loadHostData()
      }
    });


    if (this.type == 'edit') {
      this.loadHostData()
    }
    else {
      this.loadDefault()
    }
  }

  loadHostData() {
    this
      .hostService
      .getHost(this.id)
      .subscribe((data: Host) => {
        this.host = data;
      });
  }

  loadDefault() {
    this.host = {
      host_name: "",
      root_path: "/",
      tls: true,
      staging: false,
      dns_verification: false,
      dns_provider: null,
      custom_ssl: false,
      custom_certs: [],
      force_redirect_https: true
    } as Host;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSubmit(){
    console.log(this.host);
    this
    .hostService
    .addHost(this.host)
    .subscribe((data: Host) => {
      this.host = data;
      this.page_title = 'Edit host';
    });
  }
}
