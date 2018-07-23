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

    @Column(name = "auth0user_id", unique = true)
    private String auth0UserId;

    private String fornavn;
    private String etternavn;

    private String imageUrl;

    @OneToMany(mappedBy = "registrator")
    private List<Vurdering> vurderinger;

    // Getters og setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getAuth0UserId(){
        return auth0UserId;
    }

    public void setAuth0UserId(String auth0UserId){
        this.auth0UserId = auth0UserId;
    }

    public String getFornavn() { return fornavn; }

    public void setFornavn(String fornavn) { this.fornavn = fornavn; }

    public String getEtternavn() { return etternavn; }

    public void setEtternavn(String etternavn) { this.etternavn = etternavn; }

    public String getImageUrl(){
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }

    @JsonIgnore
    public List<Vurdering> getVurderinger() { return vurderinger; }

    public void setVurderinger(List<Vurdering> vurderinger) { this.vurderinger = vurderinger; }
}
