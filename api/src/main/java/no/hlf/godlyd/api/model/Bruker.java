package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "brukere")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Bruker implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String brukernavn;
    private String passord;

    private String fornavn;
    private String etternavn;

    @Column(unique = true)
    private String epost;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "registrator")
    private Set<Vurdering> vurderinger;


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

    public Set<Vurdering> getVurderinger() { return vurderinger; }

    public void setVurderinger(Set<Vurdering> vurderinger) { this.vurderinger = vurderinger; }
}
