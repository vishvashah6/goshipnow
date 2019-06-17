import {Component, OnInit, ElementRef, NgZone, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';

import {UserService, ShippingService, ConfigService} from '../_services/index';
import {Shipment} from '../_models/shippment';
import {ToastrService} from 'ngx-toastr';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {isNullOrUndefined} from 'util';


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'addShipping.component.html'
})

export class AddShippingComponent implements OnInit {
  i = 1;
  lat = 53.544389;
  lng = -113.490927;
  searchKeyword = null;
  section1 = true;
  section2 = false;
  section3 = false;
  section4 = false;
  section5 = false;
  section6 = false;
  platitude;
  plongitude;
  pickupLocation = false;
  dlatitude;
  dlongitude;
  dropLocation = false;
  shipment: any = {};
  pLocation: any = {};
  dLocation: any = {};
  shipmentItem: any = {};
  shipmentItems: any = [];
  categories = [];
  isUpdate = false;
  isLoad = false;
  // origin;
  // destination;

  constructor(private router: Router,
              private userService: UserService,
              private shipperService: ShippingService,
              private configService: ConfigService,
              private toastr: ToastrService) {
  }

  @ViewChild('placesRef1') placesRef1: GooglePlaceDirective;
  @ViewChild('placesRef2') placesRef2: GooglePlaceDirective;

  public handleAddressChange1(address: any) {
    if (!isNullOrUndefined(address)) {
      console.log(address);
      this.pLocation = address;
      this.pickupLocation = true;
      this.platitude = this.lat = address.geometry.location.lat();
      this.plongitude = this.lng = address.geometry.location.lng();
    } else {
      this.pickupLocation = false;
    }
  }

  public handleAddressChange2(address: any) {
    if (!isNullOrUndefined(address)) {
      this.dLocation = address;
      this.dropLocation = true;
      this.dlatitude = this.lat = address.geometry.location.lat();
      this.dlongitude = this.lng = address.geometry.location.lng();
    } else {
      this.dropLocation = false;
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.configService.getItemCategory().subscribe(data => {
      if (data.success) {
        this.categories = data['item-category'];
      } else {
        this.toastr.error('Error in fetching Categories', 'Error !');
      }
    });
    if (localStorage.getItem('currentSite')) {
      this.shipment = JSON.parse(localStorage.getItem('currentSite'));
      if (!(this.shipment.status === 'unlisted')) {
        this.section1 = false;
        this.section6 = true;
      }
      this.isUpdate = true;
      this.pickupLocation = true;
      this.dropLocation = true;
      this.lat = this.platitude = Number(this.shipment.pickupLatitude);
      this.lng = this.plongitude = Number(this.shipment.pickupLongitude);
      this.dlatitude = Number(this.shipment.deliveryLatitude);
      this.dlongitude = Number(this.shipment.deliveryLongitude);
      // this.origin = {lat: this.lat, lng: this.lng};
      // this.destination = {lat: this.dlatitude, lng: this.dlongitude};
      this.placesRef1 = this.shipment.pickupAddress;
      this.placesRef2 = this.shipment.deliveryAddress;

      this.shipperService.getShipmentItems(this.shipment.id).subscribe(data => {
        if (data.success) {
          this.shipmentItems = data.items;
        } else {
          this.toastr.error(data.error, 'Error');
        }
      });
    }
  }

  showSection2() {
    this.section1 = false;
    this.section2 = true;
  }

  showSection3() {
    if ((this.dLocation.address_components || this.shipment.deliveryAddress)
      && (this.pLocation.address_components || this.shipment.pickupAddress)
      && this.shipment) {

      if (this.dLocation.address_components) {
        // drop Location
        const rsltAdrComponentd = this.dLocation.address_components;
        const resultLengthd = rsltAdrComponentd.length - 1;
        this.shipment.deliveryLatitude = this.dlatitude;
        this.shipment.deliveryLongitude = this.dlongitude;
        this.shipment.deliveryAddress = this.dLocation.formatted_address ? this.dLocation.formatted_address : null;
        this.shipment.deliveryZip = this.dLocation.address_components[resultLengthd].long_name;
        this.shipment.deliveryCountry = this.dLocation.address_components[resultLengthd - 1].long_name;
        this.shipment.deliveryState = this.dLocation.address_components[resultLengthd - 2].long_name;
        this.shipment.deliveryCity = this.dLocation.address_components[resultLengthd - 3].long_name;
      }

      if (this.pLocation.address_components) {
        // pickup location
        const rsltAdrComponentp = this.pLocation.address_components;
        const resultLengthp = rsltAdrComponentp.length - 1;
        this.shipment.pickupLatitude = this.platitude;
        this.shipment.pickupLongitude = this.plongitude;
        this.shipment.pickupAddress = this.pLocation.formatted_address;
        this.shipment.pickupZip = this.pLocation.address_components[resultLengthp].long_name;
        this.shipment.pickupCountry = this.pLocation.address_components[resultLengthp - 1].long_name;
        this.shipment.pickupState = this.pLocation.address_components[resultLengthp - 2].long_name;
        this.shipment.pickupCity = this.pLocation.address_components[resultLengthp - 3].long_name;
      }
      this.shipment.truckType = 'van';
      if (!this.isUpdate) {
        this.shipperService.create(this.shipment)
          .subscribe(
            ship => {
              if (ship.success) {
                this.shipment.id = ship.id;
                this.toastr.success('Data added successfully!', 'Success!');
                this.section2 = false;
                this.section3 = true;
              } else {
                this.toastr.error(ship.error, 'Error!');
              }
            },
            error => {
              this.toastr.error(error, 'Error!');
            });
      } else {
        this.shipperService.update(this.shipment)
          .subscribe(
            ship => {
              if (ship.success) {
                this.shipment.id = ship.id;
                this.toastr.success('Shipment updated successfully!', 'Success!');
                this.section2 = false;
                this.section4 = true;
              } else {
                this.toastr.error(ship.error, 'Error!');
              }
            },
            error => {
              this.toastr.error(error, 'Error!');
            });
      }

    } else {
      this.toastr.error('Please fill required fields.', 'Error');
    }
  }

  showSection4() {
    if (this.shipmentItems.length > 0) {
      this.section3 = false;
      this.section4 = true;
    } else {
      this.toastr.error('There is no item available to ship.', 'Error');
    }
  }

  showSection5() {
    if (this.shipmentItems.length > 0) {
      this.section4 = false;
      this.section5 = true;
    } else {
      this.toastr.error('There is no item available to ship.', 'Error');
    }
  }

  addShipmentItem() {
    this.shipperService.addShipmentItem(this.shipment.id, this.shipmentItem)
      .subscribe(
        ship => {
          if (ship.success) {
            console.log(ship);
            this.shipmentItem.itemId = ship.itemId;
            this.shipment = ship.shipment;
            this.shipmentItems.unshift(this.shipmentItem);
            this.shipmentItem = {};
            this.toastr.success('Item added successfully!', 'Success!');
            document.getElementById('closeAdd').click();
            this.section3 = false;
            this.section4 = true;
          } else {
            this.toastr.error(ship.error, 'Error!');
          }
        },
        error => {
          this.toastr.error(error, 'Error!');
        });
  }

  deleteShipmentItem(item) {
    this.shipperService.deleteShipmentItem(this.shipment.id, this.shipmentItem)
      .subscribe(
        ship => {
          if (ship.success) {
            const index: number = this.shipmentItems.indexOf(this.shipmentItem);
            if (index !== -1) {
              this.shipmentItems.splice(index, 1);
            }
            this.shipment = ship.shipment;
            this.toastr.success('Item deleted successfully!', 'Success!');

          } else {
            this.toastr.error(ship.error, 'Error!');
          }
        },
        error => {
          this.toastr.error(error, 'Error!');
        });
  }

  editShipmentItem() {
    this.shipperService.editShipmentItem(this.shipment.id, this.shipmentItem)
      .subscribe(
        ship => {
          if (ship.success) {
            const index: number = this.shipmentItems.indexOf(x => x.itemId === this.shipmentItem.itemId);
            if (index !== -1) {
              this.shipmentItems[index] = this.shipmentItem;
            }
            this.shipment = ship.shipment;
            this.shipmentItem = {};
            this.toastr.success('Item Edited successfully!', 'Success!');
            document.getElementById('closeAdd').click();

          } else {
            this.toastr.error(ship.error, 'Error!');
          }
        },
        error => {
          this.toastr.error(error, 'Error!');
        });
  }

  editShipmentItemPopup(item) {
    this.shipmentItem = item;
  }

  openCheckout(item) {
    this.shipment = item;
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: (token: any) => {
        const data = {
          confirmation: token.id
        };
        this.shipperService.publishItem(item.id, data)
          .subscribe(
            ship => {
              if (ship.success) {
                this.toastr.success('Shipment published successfully!', 'Success!');
                this.router.navigate(['/shipping']);
              } else {
                this.toastr.error(ship.error, 'Error!');
              }
            },
            error => {
              this.toastr.error(error, 'Error!');
            });
      }
    });

    handler.open({
      name: 'Go Ship Now',
      description: 'Shipment Confirmation',
      amount: this.shipment.cost * 100,
    });
  }
}
