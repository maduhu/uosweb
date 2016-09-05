Single Sign-On
==============

** Identity management ** (IdM) describes the management of individual identities, their authentication, authorization, roles, and privileges within or across system and enterprise boundaries[1] with the goal of increasing security and productivity while decreasing cost, downtime, and repetitive tasks.

Technologies, services, and terms related to Identity management include **Active Directories**, **Service Providers**, **Identity Providers**, **Web Services**, **Access control**, **Digital Identities**, **Password Managers**, **Single Sign-on**, **Security Tokens**, **Security Token Services (STS)**, **Workflows**, **OpenID**, **WS-Security**, **WS-Trus**t, **SAML 2.0**, **OAuth**, and **RBAC**.

# SAML 2.0

**Security Assertion Markup Language 2.0** (SAML 2.0) is a version of the SAML standard for exchanging authentication and authorization data between security domains. SAML 2.0 is an XML-based protocol that uses security tokens containing assertions to pass information about a principal (usually an end user) between a SAML authority, that is, an identity provider, and a SAML consumer, that is, a service provider. SAML 2.0 enables web-based authentication and authorization scenarios including cross-domain single sign-on (SSO), which helps reduce the administrative overhead of distributing multiple authentication tokens to the user.


## Asertions

An assertion is a package of information that supplies zero or more statements made by a SAML authority. SAML assertions are usually made about a subject, represented by the <Subject> element. The SAML 2.0 specification defines three different kinds of assertion statements that can be created by a SAML authority. All SAML-defined statements are associated with a subject. The three kinds of statements defined are as follows:

*  Authentication Assertion: The assertion subject was authenticated by a particular means at a particular time.
*  Attribute Assertion: The assertion subject is associated with the supplied attributes.
*  Authorization Decision Assertion: A request to allow the assertion subject to access the specified resource has been granted or denied.

An important type of SAML assertion is the so-called "bearer" assertion used to facilitate Web Browser SSO. Here is an example of a short-lived bearer assertion issued by an identity provider (https://idp.example.org/SAML2) to a service provider (https://sp.example.com/SAML2). The assertion includes both an Authentication Assertion <saml:AuthnStatement> and an Attribute Assertion <saml:AttributeStatement>, which presumably the service provider uses to make an access control decision. The prefix saml: represents the SAML V2.0 assertion namespace.

```
<saml:Assertion
   xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
   xmlns:xs="http://www.w3.org/2001/XMLSchema"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   ID="b07b804c-7c29-ea16-7300-4f3d6f7928ac"
   Version="2.0"
   IssueInstant="2004-12-05T09:22:05">
   <saml:Issuer>https://idp.example.org/SAML2</saml:Issuer>
   <ds:Signature
     xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
   <saml:Subject>
     <saml:NameID
       Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient">
       3f7b3dcf-1674-4ecd-92c8-1544f346baf8
     </saml:NameID>
     <saml:SubjectConfirmation
       Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
       <saml:SubjectConfirmationData
         InResponseTo="aaf23196-1773-2113-474a-fe114412ab72"
         Recipient="https://sp.example.com/SAML2/SSO/POST"
         NotOnOrAfter="2004-12-05T09:27:05"/>
     </saml:SubjectConfirmation>
   </saml:Subject>
   <saml:Conditions
     NotBefore="2004-12-05T09:17:05"
     NotOnOrAfter="2004-12-05T09:27:05">
     <saml:AudienceRestriction>
       <saml:Audience>https://sp.example.com/SAML2</saml:Audience>
     </saml:AudienceRestriction>
   </saml:Conditions>
   <saml:AuthnStatement
     AuthnInstant="2004-12-05T09:22:00"
     SessionIndex="b07b804c-7c29-ea16-7300-4f3d6f7928ac">
     <saml:AuthnContext>
       <saml:AuthnContextClassRef>
         urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
      </saml:AuthnContextClassRef>
     </saml:AuthnContext>
   </saml:AuthnStatement>
   <saml:AttributeStatement>
     <saml:Attribute
       xmlns:x500="urn:oasis:names:tc:SAML:2.0:profiles:attribute:X500"
       x500:Encoding="LDAP"
       NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:uri"
       Name="urn:oid:1.3.6.1.4.1.5923.1.1.1.1"
       FriendlyName="eduPersonAffiliation">
       <saml:AttributeValue
         xsi:type="xs:string">member</saml:AttributeValue>
       <saml:AttributeValue
         xsi:type="xs:string">staff</saml:AttributeValue>
     </saml:Attribute>
   </saml:AttributeStatement>
 </saml:Assertion>
```

## Protocols

The following protocols are specified in SAMLCore:

*  Assertion Query and Request Protocol
*  Authentication Request Protocol
*  Artifact Resolution Protocol
*  Name Identifier Management Protocol
*  Single Logout Protocol
*  Name Identifier Mapping Protocol

The most important of these protocols—the Authentication Request Protocol—is discussed in detail below.

### Authentication Request Protocol

When a principal (or an entity acting on the principal's behalf) wishes to obtain an assertion containing an authentication statement, a <samlp:AuthnRequest> element is transmitted to the identity provider:


```
  <samlp:AuthnRequest
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="aaf23196-1773-2113-474a-fe114412ab72"
    Version="2.0"
    IssueInstant="2004-12-05T09:21:59"
    AssertionConsumerServiceIndex="0"
    AttributeConsumingServiceIndex="0">
    <saml:Issuer>https://sp.example.com/SAML2</saml:Issuer>
    <samlp:NameIDPolicy
      AllowCreate="true"
      Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient"/>
  </samlp:AuthnRequest>
```

### Artifact Resolution Protocol

A SAML message is transmitted from one entity to another either by value or by reference. A reference to a SAML message is called an artifact. The receiver of an artifact resolves the reference by sending a <samlp:ArtifactResolve> request directly to the issuer of the artifact, who then responds with the actual message referenced by the artifact.

```
  <samlp:ArtifactResolve
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="_cce4ee769ed970b501d680f697989d14"
    Version="2.0"
    IssueInstant="2004-12-05T09:21:58">
    <saml:Issuer>https://idp.example.org/SAML2</saml:Issuer>
    <!-- an ArtifactResolve message SHOULD be signed -->
    <ds:Signature
      xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
    <samlp:Artifact>AAQAAMh48/1oXIM+sDo7Dh2qMp1HM4IF5DaRNmDj6RdUmllwn9jJHyEgIi8=</samlp:Artifact>
  </samlp:ArtifactResolve>
```

## Bindings

The bindings supported by SAML 2.0 are outlined in the Bindings specification (SAMLBind[4]):

* SAML SOAP Binding (based on SOAP 1.1)
* Reverse SOAP (PAOS) Binding
* HTTP Redirect Binding
* HTTP POST Binding
* HTTP Artifact Binding
* SAML URI Binding

For Web Browser SSO, the HTTP Redirect Binding and the HTTP POST Binding are commonly used. For example, the service provider may use HTTP Redirect to send a request while the identity provider uses HTTP POST to transmit the response. This example illustrates that an entity's choice of binding is independent of its partner's choice of binding.

### HTTP Redirect Binding

SAML protocol messages are often carried directly in the URL query string of an HTTP GET request. Since the length of URLs is limited in practice, the HTTP Redirect binding is suitable for short messages, such as the <samlp:AuthnRequest> message. Longer messages (e.g., those containing signed SAML assertions) should be transmitted via other bindings such as the HTTP POST Binding.

SAML requests or responses transmitted via HTTP Redirect have a SAMLRequest or SAMLResponse query string parameter, respectively. Before it’s sent, the message is deflated, base64-encoded, and URL-encoded, in that order. Upon receipt, the process is reversed to recover the original message.

For example, encoding the <samlp:AuthnRequest> message above yields:

```
https://idp.example.org/SAML2/SSO/Redirect?SAMLRequest=fZFfa8IwFMXfBb9DyXvaJtZ1BqsURRC2Mabbw95ivc5Am3TJrXPffmmLY3%2FA15Pzuyf33On8XJXBCaxTRmeEhTEJQBdmr%2FRbRp63K3pL5rPhYOpkVdYib%2FCon%2BC9AYfDQRB4WDvRvWWksVoY6ZQTWlbgBBZik9%2FfCR7GorYGTWFK8pu6DknnwKL%2FWEetlxmR8sBHbHJDWZqOKGdsRJM0kfQAjCUJ43KX8s78ctnIz%2Blp5xpYa4dSo1fjOKGM03i8jSeCMzGevHa2%2FBK5MNo1FdgN2JMqPLmHc0b6WTmiVbsGoTf5qv66Zq2t60x0wXZ2RKydiCJXh3CWVV1CWJgqanfl0%2Bin8xutxYOvZL18NKUqPlvZR5el%2BVhYkAgZQdsA6fWVsZXE63W2itrTQ2cVaKV2CjSSqL1v9P%2FAXv4C
```

### HTTP POST Binding

In the following example, both the service provider and the identity provider use an HTTP POST Binding. Initially, the service provider responds to a request from the user agent with a document containing an XHTML form:

```
<form method="post" action="https://idp.example.org/SAML2/SSO/POST" ...>
    <input type="hidden" name="SAMLRequest" value="''request''" />
    ... other input parameter....
</form>
```

The value of the SAMLRequest parameter is the base64-encoding of a <samlp:AuthnRequest> element, which is transmitted to the identity provider via the browser. The SSO service at the identity provider validates the request and responds with a document containing another XHTML form:

```
<form method="post" action="https://sp.example.com/SAML2/SSO/POST" ...>
    <input type="hidden" name="SAMLResponse" value="''response''" />
    ...
</form>
```

### HTTP Artifact Binding

The HTTP Artifact Binding uses the Artifact Resolution Protocol and the SAML SOAP Binding (over HTTP) to resolve a SAML message by reference. Consider the following specific example. Suppose a service provider wants to send a <samlp:AuthnRequest> message to an identity provider. Initially, the service provider transmits an artifact to the identity provider via an HTTP redirect:

```
 https://idp.example.org/SAML2/SSO/Artifact?SAMLart=artifact
```

Next the identity provider sends a <samlp:ArtifactResolve> request (such as the ArtifactResolveRequest shown earlier) directly to the service provider via a back channel. Finally, the service provider returns a <samlp:ArtifactResponse> element containing the referenced <samlp:AuthnRequest> message:


```
  <samlp:ArtifactResponse
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    ID="_d84a49e5958803dedcff4c984c2b0d95"
    InResponseTo="_cce4ee769ed970b501d680f697989d14"
    Version="2.0"
    IssueInstant="2004-12-05T09:21:59">
    <!-- an ArtifactResponse message SHOULD be signed -->
    <ds:Signature
      xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
    <samlp:Status>
      <samlp:StatusCode
        Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
    </samlp:Status>
    <samlp:AuthnRequest
      xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
      xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
      ID="_306f8ec5b618f361c70b6ffb1480eade"
      Version="2.0"
      IssueInstant="2004-12-05T09:21:59"
      Destination="https://idp.example.org/SAML2/SSO/Artifact"
      ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact"
      AssertionConsumerServiceURL="https://sp.example.com/SAML2/SSO/Artifact">
      <saml:Issuer>https://sp.example.com/SAML2</saml:Issuer>
      <samlp:NameIDPolicy
        AllowCreate="false"
        Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"/>
    </samlp:AuthnRequest>
  </samlp:ArtifactResponse>
```

## Service Provider POST Request; IdP POST Response

This is a relatively simple deployment of the SAML 2.0 Web Browser SSO Profile where both the service provider (SP) and the identity provider (IdP) use the HTTP POST binding.

![SAML 2.0 Browser SSO Post](http://upload.wikimedia.org/wikipedia/en/3/38/Saml2-browser-sso-post.gif)

The message flow begins with a request for a secured resource at the Service Provider.

### 1. Request the target resource at the Service Provider

The principal (via an HTTP user agent) requests a target resource at the service provider:

```
https://sp.example.com/myresource
```

The service provider performs a security check on behalf of the target resource. If a valid security context at the service provider already exists, skip steps 2–7.

### 2. Respond with an XHTML form

The service provider responds with a document containing an XHTML form:

```
  <form method="post" action="https://idp.example.org/SAML2/SSO/POST" ...>
    <input type="hidden" name="SAMLRequest" value="''request''" />
    <input type="hidden" name="RelayState" value="''token''" />
    ...
    <input type="submit" value="Submit" />
  </form>
```

The RelayState token is an opaque reference to state information maintained at the service provider. The value of the SAMLRequest parameter is the base64 encoding of the following <samlp:AuthnRequest> element:

```
  <samlp:AuthnRequest
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="identifier_1"
    Version="2.0"
    IssueInstant="2004-12-05T09:21:59"
    AssertionConsumerServiceIndex="0">
    <saml:Issuer>https://sp.example.com/SAML2</saml:Issuer>
    <samlp:NameIDPolicy
      AllowCreate="true"
      Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient"/>
  </samlp:AuthnRequest>  
```

Before the <samlp:AuthnRequest> element is inserted into the XHTML form, it is first base64-encoded.

### 3. Request the SSO Service at the IdP

The user agent issues a POST request to the SSO service at the identity provider:

```
 POST /SAML2/SSO/POST HTTP/1.1
 Host: idp.example.org
 Content-Type: application/x-www-form-urlencoded
 Content-Length: nnn
 
 SAMLRequest=request&RelayState=token
```

where the values of the SAMLRequest and RelayState parameters are taken from the XHTML form at step 2. The SSO service processes the <samlp:AuthnRequest> element (by URL-decoding, base64-decoding and inflating the request, in that order) and performs a security check. If the user does not have a valid security context, the identity provider identifies the user (details omitted).

### 4. Respond with an XHTML form

The SSO service validates the request and responds with a document containing an XHTML form:

```
  <form method="post" action="https://sp.example.com/SAML2/SSO/POST" ...>
    <input type="hidden" name="SAMLResponse" value="''response''" />
    <input type="hidden" name="RelayState" value="''token''" />
    ...
    <input type="submit" value="Submit" />
  </form>
```

The value of the RelayState parameter has been preserved from step 3. The value of the SAMLResponse parameter is the base64 encoding of the following <samlp:Response> element:

```
  <samlp:Response
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="identifier_2"
    InResponseTo="identifier_1"
    Version="2.0"
    IssueInstant="2004-12-05T09:22:05"
    Destination="https://sp.example.com/SAML2/SSO/POST">
    <saml:Issuer>https://idp.example.org/SAML2</saml:Issuer>
    <samlp:Status>
      <samlp:StatusCode
        Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
    </samlp:Status>
    <saml:Assertion
      xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
      ID="identifier_3"
      Version="2.0"
      IssueInstant="2004-12-05T09:22:05">
      <saml:Issuer>https://idp.example.org/SAML2</saml:Issuer>
      <!-- a POSTed assertion MUST be signed -->
      <ds:Signature
        xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
      <saml:Subject>
        <saml:NameID
          Format="urn:oasis:names:tc:SAML:2.0:nameid-format:transient">
          3f7b3dcf-1674-4ecd-92c8-1544f346baf8
        </saml:NameID>
        <saml:SubjectConfirmation
          Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
          <saml:SubjectConfirmationData
            InResponseTo="identifier_1"
            Recipient="https://sp.example.com/SAML2/SSO/POST"
            NotOnOrAfter="2004-12-05T09:27:05"/>
        </saml:SubjectConfirmation>
      </saml:Subject>
      <saml:Conditions
        NotBefore="2004-12-05T09:17:05"
        NotOnOrAfter="2004-12-05T09:27:05">
        <saml:AudienceRestriction>
          <saml:Audience>https://sp.example.com/SAML2</saml:Audience>
        </saml:AudienceRestriction>
      </saml:Conditions>
      <saml:AuthnStatement
        AuthnInstant="2004-12-05T09:22:00"
        SessionIndex="identifier_3">
        <saml:AuthnContext>
          <saml:AuthnContextClassRef>
            urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
         </saml:AuthnContextClassRef>
        </saml:AuthnContext>
      </saml:AuthnStatement>
    </saml:Assertion>
  </samlp:Response>
```

### 5. Request the Assertion Consumer Service at the SP

The user agent issues a POST request to the assertion consumer service at the service provider:

 POST /SAML2/SSO/POST HTTP/1.1
 Host: sp.example.com
 Content-Type: application/x-www-form-urlencoded
 Content-Length: nnn

 SAMLResponse=response&RelayState=token
where the values of the SAMLResponse and RelayState parameters are taken from the XHTML form at step 4.

### 6. Redirect to the target resource

The assertion consumer service processes the response, creates a security context at the service provider and redirects the user agent to the target resource.

### 7. Request the target resource at the SP again

The user agent requests the target resource at the service provider (again):

 https://sp.example.com/myresource
### 8. Respond with requested resource

Since a security context exists, the service provider returns the resource to the user agent.

## Service Provider Redirect Artifact; IdP Redirect Artifact

This is a complex deployment of the SAML 2.0 Web Browser SSO Profile where both the service provider (SP) and the identity provider (IdP) use the HTTP Artifact binding. Both artifacts are delivered to their respective endpoints via HTTP GET.

![SAML 2.0 Web Browser SSO Artifact](http://upload.wikimedia.org/wikipedia/en/5/54/Saml2-browser-sso-artifact.gif)

The message flow begins with a request for a secured resource at the SP:

### 1. Request the target resource at the SP

The principal (via an HTTP user agent) requests a target resource at the service provider:

```
 https://sp.example.com/myresource
```

The service provider performs a security check on behalf of the target resource. If a valid security context at the service provider already exists, skip steps 2–11.

### 2. Redirect to the Single Sign-on (SSO) Service at the IdP

The service provider redirects the user agent to the single sign-on (SSO) service at the identity provider. A RelayState parameter and a SAMLart parameter are appended to the redirect URL.

### 3. Request the SSO Service at the IdP

The user agent requests the SSO service at the identity provider:

 https://idp.example.org/SAML2/SSO/Artifact?SAMLart=artifact_1&RelayState=token
where token is an opaque reference to state information maintained at the service provider and artifact_1 is a SAML artifact, both issued at step 2.

### 4. Request the Artifact Resolution Service at the SP

The SSO service dereferences the artifact by sending a <samlp:ArtifactResolve> element bound to a SAML SOAP message to the artifact resolution service at the service provider:

  <samlp:ArtifactResolve
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="identifier_1"
    Version="2.0"
    IssueInstant="2004-12-05T09:21:58"
    Destination="https://sp.example.com/SAML2/ArtifactResolution">
    <saml:Issuer>https://idp.example.org/SAML2</saml:Issuer>
    <!-- an ArtifactResolve message SHOULD be signed -->
    <ds:Signature
      xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
    <samlp:Artifact>''artifact_1''</samlp:Artifact>
  </samlp:ArtifactResolve>
where the value of the <samlp:Artifact> element is the SAML artifact transmitted at step 3.

### 5. Respond with a SAML AuthnRequest

The artifact resolution service at the service provider returns a <samlp:ArtifactResponse> element (containing an <samlp:AuthnRequest> element) bound to a SAML SOAP message to the SSO service at the identity provider:

  <samlp:ArtifactResponse
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    ID="identifier_2"
    InResponseTo="identifier_1"
    Version="2.0"
    IssueInstant="2004-12-05T09:21:59">
    <!-- an ArtifactResponse message SHOULD be signed -->
    <ds:Signature
      xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
    <samlp:Status>
      <samlp:StatusCode
        Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
    </samlp:Status>
    <samlp:AuthnRequest
      xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
      xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
      ID="identifier_3"
      Version="2.0"
      IssueInstant="2004-12-05T09:21:59"
      Destination="https://idp.example.org/SAML2/SSO/Artifact"
      ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact"
      AssertionConsumerServiceURL="https://sp.example.com/SAML2/SSO/Artifact">
      <saml:Issuer>https://sp.example.com/SAML2</saml:Issuer>
      <samlp:NameIDPolicy
        AllowCreate="false"
        Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"/>
    </samlp:AuthnRequest>
  </samlp:ArtifactResponse>
The SSO service processes the <samlp:AuthnRequest> element and performs a security check. If the user does not have a valid security context, the identity provider identifies the user (details omitted).

### 6. Redirect to the Assertion Consumer Service

The SSO service at the identity provider redirects the user agent to the assertion consumer service at the service provider. The previous RelayState parameter and a new SAMLart parameter are appended to the redirect URL.

### 7. Request the Assertion Consumer Service at the SP

The user agent requests the assertion consumer service at the service provider:

 https://sp.example.com/SAML2/SSO/Artifact?SAMLart=artifact_2&RelayState=token
where token is the token value from step 3 and artifact_2 is the SAML artifact issued at step 6.

### 8. Request the Artifact Resolution Service at the IdP

The assertion consumer service dereferences the artifact by sending a <samlp:ArtifactResolve> element bound to a SAML SOAP message to the artifact resolution service at the identity provider:

  <samlp:ArtifactResolve
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
    ID="identifier_4"
    Version="2.0"
    IssueInstant="2004-12-05T09:22:04"
    Destination="https://idp.example.org/SAML2/ArtifactResolution">
    <saml:Issuer>https://sp.example.com/SAML2</saml:Issuer>
    <!-- an ArtifactResolve message SHOULD be signed -->
    <ds:Signature
      xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
    <samlp:Artifact>''artifact_2''</samlp:Artifact>
  </samlp:ArtifactResolve>
where the value of the <samlp:Artifact> element is the SAML artifact transmitted at step 7.

### 9. Respond with a SAML Assertion

The artifact resolution service at the identity provider returns a <samlp:ArtifactResponse> element (containing an <samlp:Response> element) bound to a SAML SOAP message to the assertion consumer service at the service provider:

```
  <samlp:ArtifactResponse
    xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
    ID="identifier_5"
    InResponseTo="identifier_4"
    Version="2.0"
    IssueInstant="2004-12-05T09:22:05">
    <!-- an ArtifactResponse message SHOULD be signed -->
    <ds:Signature
      xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
    <samlp:Status>
      <samlp:StatusCode
        Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
    </samlp:Status>
    <samlp:Response
      xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
      xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
      ID="identifier_6"
      InResponseTo="identifier_3"
      Version="2.0"
      IssueInstant="2004-12-05T09:22:05"
      Destination="https://sp.example.com/SAML2/SSO/Artifact">
      <saml:Issuer>https://idp.example.org/SAML2</saml:Issuer>
      <ds:Signature
        xmlns:ds="http://www.w3.org/2000/09/xmldsig#">...</ds:Signature>
      <samlp:Status>
        <samlp:StatusCode
          Value="urn:oasis:names:tc:SAML:2.0:status:Success"/>
      </samlp:Status>
      <saml:Assertion
        xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
        ID="identifier_7"
        Version="2.0"
        IssueInstant="2004-12-05T09:22:05">
        <saml:Issuer>https://idp.example.org/SAML2</saml:Issuer>
        <!-- a Subject element is required -->
        <saml:Subject>
          <saml:NameID
            Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
            user@mail.example.org
          </saml:NameID>
          <saml:SubjectConfirmation
            Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
            <saml:SubjectConfirmationData
              InResponseTo="identifier_3"
              Recipient="https://sp.example.com/SAML2/SSO/Artifact"
              NotOnOrAfter="2004-12-05T09:27:05"/>
          </saml:SubjectConfirmation>
        </saml:Subject>
        <saml:Conditions
          NotBefore="2004-12-05T09:17:05"
          NotOnOrAfter="2004-12-05T09:27:05">
          <saml:AudienceRestriction>
            <saml:Audience>https://sp.example.com/SAML2</saml:Audience>
          </saml:AudienceRestriction>
        </saml:Conditions>
        <saml:AuthnStatement
          AuthnInstant="2004-12-05T09:22:00"
          SessionIndex="identifier_7">
          <saml:AuthnContext>
            <saml:AuthnContextClassRef>
              urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport
           </saml:AuthnContextClassRef>
          </saml:AuthnContext>
        </saml:AuthnStatement>
      </saml:Assertion>
    </samlp:Response>
  </samlp:ArtifactResponse>
```

### 10. Redirect to the target resource

The assertion consumer service processes the response, creates a security context at the service provider and redirects the user agent to the target resource.

### 11. Request the target resource at the SP again

The user agent requests the target resource at the service provider (again):

 https://sp.example.com/myresource
### 12. Respond with the requested resource

Since a security context exists, the service provider returns the resource to the user agent.

## Identity Provider Discovery Profile

## Assertion Query/Request Profile

## Service Provider Metadata

## Implementations

| Product Name | Project/Vendor | Type | Identity management platform | Descriptions |
|:------------:|:--------------:|:----:|:----------------------------:|--------------|
| Accounts & SSO | Nokia, Intel,… | Free Software | | Client-side implementation with plugins for various services/protocols |
| Active Directory Federation Services | Microsoft | Commercial | | Claims-based system and application federation |
| Facebook connect | Facebook | Facebook specific SSO | | Facebook SSO to third parties enabled by Facebook |
| Forefront Identity Manager | Microsoft | Commercial | Yes| State-based identity life-cycle management |
| FreeIPA | Red Hat | Free Software | Yes |
| HP IceWall SSO | Hewlett-Packard | Commercial | | Web and Federated Single Sign-On Solution |
| IBM Enterprise Identity Mapping | IBM | Free software | Yes | Works with Kerberos (e.g. Active Directory) and other authentication mechanisms to map different identities and hence allow single signon to all IBM server platforms (Windows, Linux, PowerLinux, IBM i, i5/OS, OS/400, AIX) even when the user name differs. |
| LTPA | IBM | Commercial |	
| IBM Tivoli Access Manager	 | IBM | Commercial | Yes | Web, enterprise & Federated SSO solution. IBM Tivoli Identity Manager provides Identity management platform. |
| Kerberos | M.I.T. | Protocol | | Computer network authentication protocol |
| Microsoft account | 	Microsoft | Free and Commercial |  | Microsoft single sign-on web service. Microsoft is now attracting new websites to use this system |
| myOneLogin | VMware | Commercial | | Cloud single sign-on |
| **OneLogin** | OneLogin Inc. | Commercial and **Free** | **Yes** | Cloud-based identity and access management with single sign-on (SSO) and **active directory integration** |
| Persona | Mozilla	| Free Software | | |
| SAML | OASIS | Protocol | | XML-based open standard protocol |
| Ubuntu Single Sign On | Canonical Ltd. | Comercial & Free | | OpenID-based SSO for Launchpad and Ubuntu services |
| WSO2 Identity Server | WSO2 | Free & Open Source under Apache 2.0 | Yes | SAML 2.0, OpenID, OpenID Connect, OAuth 2.0, SCIM, XACML, Passive Federation |



# OAuth
# OpenID
