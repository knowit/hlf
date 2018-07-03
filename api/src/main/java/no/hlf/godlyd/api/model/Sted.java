package no.hlf.godlyd.api.model;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "steder")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Sted implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank
    @NotNull
    private String placesId; // Google Placed id

    private String navn;

    private String telefon;

    private String nettside;

    @ManyToOne
    @JoinColumn(name = "adresse")
    private Adresse adresse;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "sted_tag",
            joinColumns = @JoinColumn(name="sted_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id"))
    private Set<Tag> tags;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "sted")
    private Set<Vurdering> vurderinger;

    public Sted(){}

    public Sted(String placesId, String navn, String telefon, String nettside, Adresse adresse, Set<Tag> tags){
        this.placesId = placesId;
        this.navn = navn;
        this.telefon = telefon;
        this.nettside = nettside;
        this.adresse = adresse;
        this.tags = tags;
    }

    // Getters og setters
    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getPlacesId() { return placesId; }

    public void setPlacesId(String placesId) { this.placesId = placesId; }

    public String getNavn() { return navn; }

    public void setNavn(String navn) { this.navn = navn; }

    public String getTelefon() { return telefon; }

    public void setTelefon(String telefon) { this.telefon = telefon; }

    public String getNettside() { return nettside; }

    public void setNettside(String nettside) { this.nettside = nettside; }

    public Adresse getAdresse() { return adresse; }

    public void setAdresse(Adresse adresse) { this.adresse = adresse; }

    public Set<Tag> getTags() { return tags; }

    public void setTags(Set<Tag> tags) { this.tags = tags; }

    public Set<Vurdering> getVurderinger() { return vurderinger; }

    public void setVurderinger(Set<Vurdering> vurderinger) { this.vurderinger = vurderinger; }
}
