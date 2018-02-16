import { CardMedia, CardText, CardTitle, CardHeader } from 'material-ui/Card';
import { GlassCard, VerticalCanvas } from 'meteor/clinical:glass-ui';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';

import { get, has } from 'lodash';

import { Session } from 'meteor/session';



export class SamplePage extends React.Component {
  constructor(props) {
    super(props);
  }
  getMeteorData() {

    let imgHeight = (Session.get('appHeight') - 210) / 3;

    let data = {
      style: {
        page: {},
        coverImg: {
          maxWidth: 'inherit',
          maxHeight: 'inherit',
          height: 'inherit'
        },
        cards: {
          media: {
            height: (imgHeight - 1) + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          },
          practitioners: {
            cursor: 'pointescale-downr',
            height: imgHeight + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          },
          organizations: {
            cursor: 'pointer',
            height: imgHeight + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          },
          locations: {
            cursor: 'pointer',
            height: imgHeight + 'px',
            overflowY: 'hidden',
            objectFit: 'cover'
          }
        },
        inactiveIndexCard: {
          opacity: .5,
          width: '100%',
          display: 'inline-block',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingBottom: '0px'
        },
        tile: {
          width: '100%',
          display: 'inline-block',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingBottom: '0px',
          marginBottom: '20px',
          height: imgHeight + 'px'
        },
        spacer: {
          display: 'block'
        },
        title: Glass.darkroom(),
        subtitle: Glass.darkroom()
      },
      user: {
        isAdmin: false,
        isPractitioner: false,
        isPatient: true
      },
      counts: {
        practitioners: 0,
        locations: 0,
        organizations: 0
      },
      organizations: {
        image: "/pages/provider-directory/organizations.jpg"
      }
    };

    var latestStats = Statistics.getLatest();
    if(latestStats && latestStats.counts){
      data.counts = latestStats.counts;
    }

    data.style.indexCard = Glass.darkroom(data.style.indexCard);

    let user = Meteor.user();
    if (user && user.roles) {
      user.roles.forEach(function(role){
        if (role === "sysadmin") {
          data.user.isAdmin = true;
        } else if (role === "practitioner") {
          data.user.isPractitioner = true;
        } else if (role === "patient") {
          data.user.isPatient = true;
        }
      });
    }

    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.app && Meteor.settings.public.app.showUnderConstruction) {
      data.showUnderConstruction = Meteor.settings.public.app.showUnderConstruction;
    }
    if (Meteor.settings && Meteor.settings.public && Meteor.settings.public.app && Meteor.settings.public.app.showExperimental) {
      data.showExperimental = Meteor.settings.public.app.showExperimental;
    }


    if (Session.get('appWidth') < 768) {
      data.style.inactiveIndexCard.width = '100%';
      data.style.inactiveIndexCard.marginBottom = '10px';
      data.style.inactiveIndexCard.paddingBottom = '10px';
      data.style.inactiveIndexCard.paddingLeft = '0px';
      data.style.inactiveIndexCard.paddingRight = '0px';

      data.style.spacer.display = 'none';
    }

    if(Session.get('appHeight') > 1200){
      data.style.page = {
        top: '50%',
        transform: 'translateY(-50%)',
        position: 'relative'
      }
    }

    // data.style = Glass.blur(data.style);
    // data.style.appbar = Glass.darkroom(data.style.appbar);

    if(process.env.NODE_ENV === "test") console.log("SamplePage[data]", data);
    return data;
  }
  render() {

    return (
      <div id='indexPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title="Blank Canvas - Build Your Own Module" style={{fontSize: '150%'}} />
            <CardText style={{fontSize: '150%'}}>
              Need an application framework for your project?  Don't want to spend years figuring out how to interface with electronic health systems?  Build your app as a plugin module for Symptomatic!
              <br />
              <br />
              <br />
              <ul>
                <li>Private plugins for your intellectual property datasets, use cases, algorithms</li>              
                <li>Compile to Phones, Tablets, Web, TV, and VideoWalls</li>              
                <li>Fast Healthcare Interoperability Resources (HL7 FHIR) data interoperability layer</li>
                <li>Library of FHIR widgets to build your workflow with.</li>              
                <li>Supported Blockchains:  Ethereum, Bigchain, PokitDok, Hyperledger, IPFS</li>
                <li>FDA precertification ready with continuous validatoin & verification testing</li>
                <li>HIPAA Ready with Business Associate Agreements (BAA)</li>              
                <li>Ready to go to market with Epic, Cerner, and Apple App Stores, or as SaaS or local deploy</li>              
                <li>Open source community base (MIT/GPL) with licensable premium plugins</li>              
                <li>Dashboards, advanced visualizations, and real time graphs.</li>              
                <li>Augmented reality interface, with geomapping and camera support for A/R health apps.</li>              
                <li>Themable and brandable</li>              
                <li>Designed by bioinformatics students at UChicago.</li>              
              </ul>
              <br />
              <br />
                Contact <a href="demos@symptomatic.io">demos@symptomatic.io</a> to schedule a demo and talk with our Bioinformatics team about implementing your workflow.  
              <br />
              <br />
                
                Visit our website at <a href="http://www.symptomatic.io">http://www.symptomatic.io</a> to download sourcecode and learn more about meetups, community forums, slack channel, and other ways of getting involved.

            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }




  openLink(url){
    console.log("openLink", url);
    browserHistory.push(url);
  }
}



ReactMixin(SamplePage.prototype, ReactMeteorData);

export default SamplePage;