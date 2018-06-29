import { Component, OnInit } from '@angular/core';
import { ProxyService } from '../../../services/proxy/proxy.service';
import { Proxy } from '../../../models/Proxy';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  proxies: Proxy[];

  constructor(private proxyservice: ProxyService) { }

  ngOnInit() {
    this.loadProxyList();
  }

  loadProxyList() {
    this
      .proxyservice
      .getProxies()
      .subscribe((data: Proxy[]) => {
        this.proxies = data;
        console.log('loaded proxy list');
      });
  }

  deleteProxy(proxy) {
    this
      .proxyservice
      .deleteProxy(proxy.id)
      .subscribe();

    console.log('deleted');
    this.removeFromList(proxy);

  }

  removeFromList(proxy) {
    this.proxies = this.proxies.filter(item => item !== proxy);
  }

}
