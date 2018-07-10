package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "bruker")
@JsonIgnoreProperties({"passord", "epost"})
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

    public Bruker(){}

    /*
    public void addVurdering(Vurdering vurdering){
        this.vurderinger.add(vurdering);
        //vurdering.setRegistrator(this);
    }
    */

    // Getters og setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getBrukernavn() { return brukernavn; }

    public void setBrukernavn(String brukernavn) { this.brukernavn = brukernavn; }

    public String getPassord() { return passord; }

    public void setPassord(String passord) { this.passord = passord; }

    public String getFornavn() { return fornavn; }

    public void setFornavn(String fornavn) { this.fornavn = fornavn; }

    public String getEtternavn() { return etternavn; }

    public void setEtternavn(String etternavn) { this.etternavn = etternavn; }

    public String getEpost() { return epost; }

    public void setEpost(String epost) { this.epost = epost; }

    @JsonIgnore
    public List<Vurdering> getVurderinger() { return vurderinger; }

    public void setVurderinger(List<Vurdering> vurderinger) { this.vurderinger = vurderinger; }
}
