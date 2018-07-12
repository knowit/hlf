package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.*;
import no.hlf.godlyd.api.Views;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "bruker")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Bruker implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String brukernavn;

    private String passord;
    private String fornavn;
    private String etternavn;

    @Column(unique = true)
    private String epost;

    @OneToMany(mappedBy = "registrator")
    private List<Vurdering> vurderinger;

    public Bruker(String brukernavn, String epost) {
        this.brukernavn = brukernavn;
        this.epost = epost;
    }

    public Bruker(String brukernavn, String passord, String fornavn, String etternavn, String epost){
        this.brukernavn = brukernavn;
        this.passord = passord;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.epost = epost;
    }

    public Bruker(){}

    /*
    public void addVurdering(Vurdering vurdering){
        this.vurderinger.add(vurdering);
        //vurdering.setRegistrator(this);
    }
    */

    // Getters og setters
    //@JsonView(Views.Public.class)
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    //@JsonView(Views.Public.class)
    public String getBrukernavn() { return brukernavn; }

    public void setBrukernavn(String brukernavn) { this.brukernavn = brukernavn; }

    //@JsonView(Views.Internal.class)
    //@JsonIgnore
    public String getPassord() { return passord; }

    public void setPassord(String passord) { this.passord = passord; }

    //@JsonView(Views.Public.class)
    public String getFornavn() { return fornavn; }

    public void setFornavn(String fornavn) { this.fornavn = fornavn; }

    //@JsonView(Views.Public.class)
    public String getEtternavn() { return etternavn; }

    public void setEtternavn(String etternavn) { this.etternavn = etternavn; }

    //@JsonView(Views.Internal.class)
    public String getEpost() { return epost; }

    public void setEpost(String epost) { this.epost = epost; }

    //@JsonView(Views.Internal.class)
    @JsonIgnore
    public List<Vurdering> getVurderinger() { return vurderinger; }

    public void setVurderinger(List<Vurdering> vurderinger) { this.vurderinger = vurderinger; }
}
